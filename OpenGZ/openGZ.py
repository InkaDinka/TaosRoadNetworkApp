import gzip
import json
import jsonlines

def parse_json(filename):
    with gzip.open(filename, 'rb') as f:
        file_content = f.read()
    
#Convert bytes to string
    file_content_str = file_content.decode('utf-8')

#Write content to a temporary file for jsonlines to read
    with open('temp.json', 'w', encoding='utf-8') as temp_file:
        temp_file.write(file_content_str)

#Read and format JSON data using jsonlines
    with open('temp.json', 'r', encoding='utf-8') as temp_file:
        reader = jsonlines.Reader(temp_file)
        data_list = [obj for obj in reader]

#Combine JSON objects into one if needed
    if len(data_list) == 1:
        geojson_data = data_list[0]
    else:
        geojson_data = data_list

#Write the formatted JSON data to a new file
    formatted_geojson_data = json.dumps(geojson_data, indent=4)
    with open('formatted_geojsonABQ.json', 'w', encoding='utf-8') as f:
        f.write(formatted_geojson_data)

    print("Formatted JSON data has been written to 'formatted_geojson.json'")

parse_json('source.geojson.gz')