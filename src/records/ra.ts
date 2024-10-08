import { encode as encodeIp, decode as decodeIp } from "@leichtgewicht/ip-codec";

export function encode(host: string, buf?: Buffer, offset = 0) {
    if (!buf) {
        buf = Buffer.allocUnsafe(encodingLength());
    }
    if (!offset) {
        offset = 0;
    }

    buf.writeUInt16BE(4, offset);
    offset += 2;

    encodeIp(host, buf, offset);
    encode.bytes = 6;
    return buf;
}
encode.bytes = 0;

export function decode(buf: Buffer, offset = 0) {
    if (!offset) {
        offset = 0;
    }

    offset += 2;
    const host = decodeIp(buf, offset, 4);
    decode.bytes = 6;
    return host;
}

decode.bytes = 0;
export function encodingLength() {
    return 6;
}
