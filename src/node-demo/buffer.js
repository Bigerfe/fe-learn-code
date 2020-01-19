const fs = require('fs');
const path = require('path');

function g(e, t) {
    return t.length ? t.reduce(function (e, t) {
        return e[t]
    }, e) : e
}

 function decompressFromBase64(t) {
     return null == t ? "" : "" == t ? null : _decompress(t.length, 32, function (e) {
        return o(n, t.charAt(e))
    })
}

function decompress(t) {
    return null == t ? "" : "" == t ? null : _decompress(t.length, 32768, function (e) {
        return t.charCodeAt(e)
    })
}

function _decompress(e, t, n) {
    var r, i, o, a, s, c, u, l = [],
        d = 4,
        f = 4,
        h = 3,
        p = "",
        m = [],
        v = {
            val: n(0),
            position: t,
            index: 1
        };
    for (r = 0; r < 3; r += 1)
        l[r] = r;
    for (o = 0,
        s = Math.pow(2, 2),
        c = 1; c != s;)
        a = v.val & v.position,
        v.position >>= 1,
        0 == v.position && (v.position = t,
            v.val = n(v.index++)),
        o |= (0 < a ? 1 : 0) * c,
        c <<= 1;
    switch (o) {
        case 0:
            for (o = 0,
                s = Math.pow(2, 8),
                c = 1; c != s;)
                a = v.val & v.position,
                v.position >>= 1,
                0 == v.position && (v.position = t,
                    v.val = n(v.index++)),
                o |= (0 < a ? 1 : 0) * c,
                c <<= 1;
            u = g(o);
            break;
        case 1:
            for (o = 0,
                s = Math.pow(2, 16),
                c = 1; c != s;)
                a = v.val & v.position,
                v.position >>= 1,
                0 == v.position && (v.position = t,
                    v.val = n(v.index++)),
                o |= (0 < a ? 1 : 0) * c,
                c <<= 1;
            u = g(o);
            break;
        case 2:
            return ""
    }
    for (i = l[3] = u,
        m.push(u);;) {
        if (v.index > e)
            return "";
        for (o = 0,
            s = Math.pow(2, h),
            c = 1; c != s;)
            a = v.val & v.position,
            v.position >>= 1,
            0 == v.position && (v.position = t,
                v.val = n(v.index++)),
            o |= (0 < a ? 1 : 0) * c,
            c <<= 1;
        switch (u = o) {
            case 0:
                for (o = 0,
                    s = Math.pow(2, 8),
                    c = 1; c != s;)
                    a = v.val & v.position,
                    v.position >>= 1,
                    0 == v.position && (v.position = t,
                        v.val = n(v.index++)),
                    o |= (0 < a ? 1 : 0) * c,
                    c <<= 1;
                l[f++] = g(o),
                    u = f - 1,
                    d--;
                break;
            case 1:
                for (o = 0,
                    s = Math.pow(2, 16),
                    c = 1; c != s;)
                    a = v.val & v.position,
                    v.position >>= 1,
                    0 == v.position && (v.position = t,
                        v.val = n(v.index++)),
                    o |= (0 < a ? 1 : 0) * c,
                    c <<= 1;
                l[f++] = g(o),
                    u = f - 1,
                    d--;
                break;
            case 2:
                return m.join("")
        }
        if (0 == d && (d = Math.pow(2, h),
                h++),
            l[u])
            p = l[u];
        else {
            if (u !== f)
                return null;
            p = i + i.charAt(0)
        }
        m.push(p),
            l[f++] = i + p.charAt(0),
            i = p,
            0 == --d && (d = Math.pow(2, h),
                h++)
    }
}



var data = fs.readFileSync(path.resolve(__dirname,'./base64.txt')).toString();
console.log(data);
const d = decompressFromBase64(data);