import * as name from "@/name";

export function encode(data: string, buf?: Buffer, offset = 0) {
    if (!buf) buf = Buffer.allocUnsafe(encodingLength(data));
    if (!offset) offset = 0;

    name.encode(data, buf, offset + 2);
    buf.writeUInt16BE(name.encode.bytes, offset);
    encode.bytes = name.encode.bytes + 2;
    return buf;
}

encode.bytes = 0;

export function decode(buf: Buffer, offset = 0) {
    if (!offset) offset = 0;

    const len = buf.readUInt16BE(offset);
    const dd = name.decode(buf, offset + 2);

    decode.bytes = len + 2;
    return dd;
}

decode.bytes = 0;

export function encodingLength(data: string) {
    return name.encodingLength(data) + 2;
}
