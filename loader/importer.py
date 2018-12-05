import json

import pandas as pd
import os
import dateparser
import datetime

data_dir = '../data'


class Importer:
    def __init__(self, csv_path):
        self.csv_path = csv_path
        self.converters = {}
        self.dtype = {}

    def run(self, chunksize=512, skiprows=None):
        for df in pd.read_csv(self.csv_path,
                              delimiter=',', encoding='utf-8',
                              dtype=self.dtype, converters=self.converters,
                              chunksize=chunksize, skiprows=skiprows,
                              error_bad_lines=False, warn_bad_lines=True, index_col=False):

            df = df.where((pd.notnull(df)), None)
            self.start_chunk()
            for i, row in df.iterrows():
                self.handle_row(row)
            self.end_chunk()

    def start_chunk(self):
        pass

    def handle_row(self, row):
        pass

    def end_chunk(self):
        pass


class ImporterToJsonl(Importer):
    def __init__(self, csv_path, output_path):
        super().__init__(csv_path)
        self.buffer = []
        self.output = open(output_path, 'w+')

    def start_chunk(self):
        self.buffer = []

    def handle_row(self, row):
        self.buffer.append(row)

    def end_chunk(self):
        print("writing {} lines in output file".format(len(self.buffer)))
        for row in self.buffer:
            self.output.write(json.dumps(row, ensure_ascii=False))
            self.output.write("\n")
        print("wrote {} lines in output file".format(len(self.buffer)))

        self.output.flush()
        self.buffer = []


class ImporterNormalized(ImporterToJsonl):
    HEADER_FINAL = {
        'cote'
        'date',
        'prenom',
        'nom',
        'profession',
        'date_naissance',
        'pays_naissance',
    }

    def __init__(self, csv_path, output_path, year):
        super(ImporterNormalized, self).__init__(csv_path, output_path)
        self.year = year
        self.ddp = dateparser.date.DateDataParser(languages=['fr'],
                                                  settings={'RELATIVE_BASE': datetime.datetime(year, 1, 1, 0, 0)})

    def parse_literal_date(self, literal):
        if literal is None:
            return None
        res = self.ddp.get_date_data(literal)
        if res['date_obj'] is None:
            print("strange date {}, ignoring".format(literal))
            return None
        return res['date_obj'].isoformat()

    def handle_row(self, row):
        res = {
            'cote': self.extract_cote(row),
            'date': self.extract_date(row),
            'nom': self.extract_nom(row),
            'prenoms': self.extract_prenoms(row),
            'date_naissance': self.extract_date_naissance(row),
            'profession': self.extract_profession(row),
            'pays_naissance': self.extract_pays_naissance(row),
            "original": row.to_dict()
        }
        super(ImporterNormalized, self).handle_row(res)

    def extract_cote(self, row):
        pass

    def extract_date(self, row):
        pass

    def extract_nom(self, row):
        pass

    def extract_prenoms(self, row):
        pass

    def extract_date_naissance(self, row):
        pass

    def extract_profession(self, row):
        pass

    def extract_pays_naissance(self, row):
        pass


class Importer1887(ImporterNormalized):
    HEADER_1887 = [
        'DOCUMENT',
        'Type_decret',
        'Date_decret',
        'DECRET_COTE',
        'COTE',
        'Nom',
        'Prenoms',
        'Date_naissance',
        'Lieu_naissance 1',
        'Dpt_naissance',
        'Pays_naissance',
        'Origine_parents',
        'Profession',
        'Profession_categorie',
        'Lieu_residence',
        'Ep_Nom',
        'Ep_Date_naissance',
        'Ep_Lieu_naissance',
        'REMARQUES'
    ]

    CSV_PATH = os.path.join(data_dir, 'transformed/indexation_decrets_1887_clean.csv')

    def __init__(self, output_path):
        super(Importer1887, self).__init__(Importer1887.CSV_PATH, output_path, 1887)

    def parse_document_date(self, literal):
        if literal is None:
            return datetime.datetime(1887, 1, 1, 0, 0).isoformat()
        else:
            return self.parse_literal_date(literal)

    def extract_cote(self, row):
        return row['COTE']

    def extract_date(self, row):
        return self.parse_document_date(row['Date_decret'])

    def extract_nom(self, row):
        return row['Nom']

    def extract_prenoms(self, row):
        return row['Prenoms']

    def extract_date_naissance(self, row):
        return self.parse_literal_date(row['Date_naissance'])

    def extract_profession(self, row):
        return row['Profession']

    def extract_pays_naissance(self, row):
        return row['Pays_naissance']


class Importer1890(ImporterNormalized):
    HEADER_1890 = [
        'Mois',
        'Numéro du document',
        'Numéro de dossier',
        'id',
        'NOM',
        'Prénom(s)',
        'Profession',
        'Date de naissance',
        'Date de naissance (texte libre)',
        'Ville de naissance',
        'Département de naissance',
        'Pays de naissance',
        'Ville de résidence',
        'Département de résidence',
        'Pays de résidence',
        'NOM2',
        'Prénom(s)2',
        'Date de naissance 2',
        'Date de naissance (texte libre) 2',
        'Ville de naissance 2',
        'Département de naissance 2',
        'Pays de naissance 2',
        'Prénom(s) et date(s) de naissance'  # enfants
    ]

    CSV_PATH = os.path.join(data_dir, 'sources/indexation_decrets_1890.csv')

    def __init__(self, output_path):
        super(Importer1890, self).__init__(Importer1890.CSV_PATH, output_path, 1890)

    def parse_document_date(self, literal):
        if literal is None:
            return datetime.datetime(1890, 1, 1, 0, 0).isoformat()
        else:
            return self.parse_literal_date(literal)

    def extract_cote(self, row):
        return row['Numéro de dossier']

    def extract_date(self, row):
        return self.parse_document_date(row['Mois'])

    def extract_nom(self, row):
        return row['NOM']

    def extract_prenoms(self, row):
        return row['Prénom(s)']

    def extract_date_naissance(self, row):
        return self.parse_literal_date(row['Date de naissance'])

    def extract_profession(self, row):
        return row['Profession']

    def extract_pays_naissance(self, row):
        return row['Pays de naissance']


class ImporterOriginal(ImporterToJsonl):
    def __init__(self, csv_path, output_path):
        super(ImporterOriginal, self).__init__(csv_path, output_path)

    def handle_row(self, row):
        super(ImporterOriginal, self).handle_row(row.to_dict())


def import_original():
    importer_original1887 = ImporterOriginal(csv_path="../data/sources/indexation_decrets_1887.csv",
                                             output_path=os.path.join(data_dir,
                                                                      "transformed/indexation_decrets_original_1887.jsonl"))
    importer_original1887.run(chunksize=1024)
    importer_original1887.output.close()

    importer_original1890 = ImporterOriginal(csv_path="../data/sources/indexation_decrets_1890.csv",
                                             output_path=os.path.join(data_dir,
                                                                      "transformed/indexation_decrets_original_1890.jsonl"))
    importer_original1890.run(chunksize=1024)
    importer_original1890.output.close()


def import_normalized():
    # importer1887 = Importer1887(output_path="../data/transformed/indexation_decrets_normalized_1887.jsonl")
    # importer1887.run(chunksize=1024)
    # importer1887.output.close()

    importer1890 = Importer1890(output_path="../data/transformed/indexation_decrets_normalized_1890.jsonl")
    importer1890.run(chunksize=1024)
    importer1890.output.close()


if __name__ == '__main__':
    # import_original()
    import_normalized()
    # importer1887 = Importer1887(output_path=os.path.join(data_dir, "transformed/indexation_decrets_1887.jsonl"))
    # importer1887.run(chunksize=1024)
    # importer1887.output.close()
