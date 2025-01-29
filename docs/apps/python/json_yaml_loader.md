# JSON YAML loader

Load YAML-based LibreLingo courses in your Python project.

It contains two schema files:  
- module.json  
- skill.json  
These two files are the schema for getting a match with the one in the course that one wants to create.

Main function of the loader is the load_course function.
This function is responsible to create a Course object, that has the following props: