"""
Generates icons/icon-{16,48,128}.png — solid #1a73e8 squares.
Run once: python3 generate_icons.py
No external dependencies required.
"""
import struct, zlib, os

def make_png(size, r, g, b):
    def chunk(tag, data):
        body = tag + data
        crc = zlib.crc32(body) & 0xffffffff
        return struct.pack('>I', len(data)) + body + struct.pack('>I', crc)

    ihdr_data = struct.pack('>IIBBBBB', size, size, 8, 2, 0, 0, 0)
    raw_rows = b''.join(b'\x00' + bytes([r, g, b] * size) for _ in range(size))

    return (
        b'\x89PNG\r\n\x1a\n'
        + chunk(b'IHDR', ihdr_data)
        + chunk(b'IDAT', zlib.compress(raw_rows))
        + chunk(b'IEND', b'')
    )

os.makedirs('icons', exist_ok=True)
for size in [16, 48, 128]:
    path = f'icons/icon-{size}.png'
    with open(path, 'wb') as f:
        f.write(make_png(size, 26, 115, 232))  # #1a73e8
    print(f'created {path}')
