import re

def dms_to_decimal(dms_str):
    # Regex to extract degrees, minutes, seconds, and direction from the DMS string
    pattern = r"(\d+)°(\d+)'(\d+\.\d+)\"([NSWE])"
    matches = re.findall(pattern, dms_str)
    
    if not matches or len(matches) != 2:
        raise ValueError("Invalid DMS format")

    # Process latitude
    lat_deg, lat_min, lat_sec, lat_dir = matches[0]
    lat_decimal = int(lat_deg) + int(lat_min) / 60 + float(lat_sec) / 3600
    if lat_dir == 'S':
        lat_decimal = -lat_decimal

    # Process longitude
    lon_deg, lon_min, lon_sec, lon_dir = matches[1]
    lon_decimal = int(lon_deg) + int(lon_min) / 60 + float(lon_sec) / 3600
    if lon_dir == 'W':
        lon_decimal = -lon_decimal

    return lat_decimal, lon_decimal


# multiline literal is gross but simple for this
coordinate = r"""
39°46'53.6"N 84°03'50.8"W
"""


# https://stackoverflow.com/questions/783897/how-to-truncate-float-values
def truncate(f, n):
    '''Truncates/pads a float f to n decimal places without rounding'''
    s = '{}'.format(f)
    if 'e' in s or 'E' in s:
        return '{0:.{1}f}'.format(f, n)
    i, p, d = s.partition('.')
    return '.'.join([i, (d+'0'*n)[:n]])



print(coordinate)

num_dec = 6

lat, lon = dms_to_decimal(coordinate)
print(truncate(lat, num_dec))
print(truncate(lon, num_dec))




# Process each coordinate and convert to decimal
# for dms_str in coordinates:
#     try:
#         lat_decimal, lon_decimal = dms_to_decimal(dms_str)
#         print(f"DMS: {dms_str} -> Decimal Coordinates: Latitude = {lat_decimal}, Longitude = {lon_decimal}")
#     except ValueError as e:
#         print(f"Error processing {dms_str}: {e}")
