from collections import defaultdict
import json
from typing import DefaultDict


def highlights(sessionName: str):
    """Counts the frequency of each type of event"""
    with open(sessionName, "r") as f:
        events = json.load(f)

    count = defaultdict(lambda: defaultdict(int))
    curEnvName = "no-environment"
    curTestingGroup = "no-interest-badge"
    for event in events:
        if event["name"] == "Start Environment":
            curEnvName = event["environment"]["name"]
        if event["name"] == "Start Testing Group":
            curTestingGroup = event["testingGroup"]

        count[curTestingGroup][event["name"]] += 1

    for key in count.keys():
        print("Testing group:", key)
        print("-" * 10)
        secondDict = count[key]
        for key2 in secondDict.keys():
            print(key2, secondDict[key2])
        print()


if __name__ == "__main__":
    highlights("Sam-Chen-events.json")
