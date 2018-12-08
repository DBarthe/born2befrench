import json

from elasticsearch import Elasticsearch

# curl -X PUT -H Content-type:application/json localhost:9200/decret?pretty -d @../elasticsearch/mapping.json

es = Elasticsearch()


def load_jsonl(path, index):
    with open(path) as f:
        for line in f:
            doc = json.loads(line)
            print("putting one document {}", doc)
            res = es.index(index=index, doc_type="_doc", body=doc)
            print(res)



def load_original():
    load_jsonl("../data/transformed/indexation_decrets_original_1887.jsonl", index="original1887")
    load_jsonl("../data/transformed/indexation_decrets_original_1890.jsonl", index="original1890")

def load_normalized():
    load_jsonl("../data/transformed/indexation_decrets_normalized_1887.jsonl", index="nat")
    load_jsonl("../data/transformed/indexation_decrets_normalized_1890.jsonl", index="nat")


if __name__ == '__main__':
    #load_original()
    load_normalized()
