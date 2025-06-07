import json
import sys
import os


def main():
    config_filename = "config/courses.json"
    with open(config_filename) as fh:
        config = json.load(fh)

    for course in config:
        print(course)
        if course["deploy"]:
            cmd = f"""yarn installCourse "{course["url"]}" {course["paths"]["jsonFolder"]}"""
            print(cmd)
            exit_code = os.system(cmd)
            if exit_code != 0:
                sys.exit(
                    f"""We failed to install {course["paths"]["jsonFolder"]}. Terminating"""
                )


if __name__ == "__main__":
    main()
