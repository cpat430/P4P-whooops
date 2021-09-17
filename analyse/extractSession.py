import json
import os
import sys


def extractSession(allEventsFile: str, firstName: str, lastName: str) -> None:
    """Reads the json with all the events and saves a particular session in a separate output file."""

    with open(allEventsFile, "r") as f:
        allEvents = json.load(f)

    events = []
    isParticipant = False
    for event in allEvents:
        if event["name"] == "Submit Details":
            print("> Parsing participant:", event["firstName"], event["lastName"])
            if event["firstName"] == firstName and event["lastName"] == lastName:
                isParticipant = True
            else:
                isParticipant = False

        # Only append events that are under the participant's name
        if isParticipant:
            events.append(event)

    if len(events) == 0:
        print(f"There are no events with {firstName} {lastName} :/")
        sys.exit(1)

    # Save the events in a separate file - e.g. Steph-Curry-events.json
    outputFile = f"{firstName}-{lastName}-events.json"
    if os.path.exists(outputFile):
        print(f"Sorry, file '{outputFile}' exists already! Terminating...")
        sys.exit(1)

    with open(outputFile, "w") as f:
        json.dump(events, f)
    print("Successfully saved session!")


if __name__ == "__main__":
    allEventsFile = "allEvents.json"
    firstName = "Sam"
    lastName = "Chen"
    extractSession(allEventsFile, firstName, lastName)