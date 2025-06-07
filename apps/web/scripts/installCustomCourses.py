import json
import sys
import os


class color:
    PURPLE = "\033[95m"
    CYAN = "\033[96m"
    DARKCYAN = "\033[36m"
    BLUE = "\033[94m"
    GREEN = "\033[92m"
    YELLOW = "\033[93m"
    RED = "\033[91m"
    BOLD = "\033[1m"
    UNDERLINE = "\033[4m"
    END = "\033[0m"


def main():
    courses_file = "config/courses.json"
    with open(courses_file) as fp:
        courses = json.load(fp)

    available_course_count = len(courses)

    print("there are " + str(available_course_count) + " courses available.")

    print("\n-----")

    course_count = 0

    downloading = []

    for course in courses:
        course_count += 1
        print(
            color.BOLD
            + course["name"]
            + color.END
            + " ("
            + str(course_count)
            + "/"
            + str(available_course_count)
            + ")"
        )
        print("(" + course["url"] + ")")
        print(color.UNDERLINE + course["description"] + color.END)
        download = input("Would you like to download this course? (y/n) ")
        print("-----")
        if download == "y":
            downloading.append(course)
        else:
            continue

    print("The following courses will be downloaded: ")
    for course in downloading:
        print(course["name"])
    continue_var = input("Continue? (y/n) ")
    if continue_var == "y":
        for course in downloading:
            cmd = (
                "npm run installCourse "
                + course["url"]
                + " "
                + course["paths"]["jsonFolder"]
            )
            print(cmd)
            exit_code = os.system(cmd)
            if exit_code != 0:
                sys.exit("Failed to install " + course["name"])


if __name__ == "__main__":
    main()
