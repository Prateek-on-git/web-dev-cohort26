JWT Authentication in Node.js Explained
Why Authentication is Required

Authentication answers a simple question:
“Who is this user?”

Without authentication:
Anyone can access protected resources
No user-specific data security
APIs become vulnerable to abuse

With authentication:
Only verified users access certain routes
User identity is attached to each request
Security and personalization become possible



What Authentication Means

Authentication is the process of verifying a user’s identity using:
Username/password
Tokens
Biometrics (less common in APIs)

In backend systems like Node.js APIs, authentication is typically:
Request-based
Handled via middleware


What is JWT?

JWT (JSON Web Token) is a compact, URL-safe token used to securely transmit information between parties.

Think of it like a digitally signed identity card.

Key Idea:

The server does NOT store session data → the token itself contains the user info.

This is called stateless authentication.

  Stateless Authentication (Simple Explanation)

Traditional (stateful):

Server stores sessions in memory/database
Needs lookup on every request

JWT (stateless):

Server signs a token
Client stores it (usually in localStorage or cookies)
Server verifies token on each request
No session storage needed



Structure of a JWT
A JWT has 3 parts, separated by dots:

xxxxx.yyyyy.zzzzz



Header
Contains metadata:
{
  "alg": "HS256",
  "typ": "JWT"
}
alg → algorithm used for signing
typ → token type

Payload
Contains claims (data):

{
  "userId": "12345",
  "email": "user@example.com",
  "role": "admin"
}
Types of claims:
Registered: iss, exp, sub
Public: custom data
Private: app-specific
⚠️ Payload is not encrypted, only encoded.


3 Signature

Created using:
HMACSHA256(
  base64UrlEncode(header) + "." + base64UrlEncode(payload),
  secret
)

Purpose:
Ensures token integrity
Prevents tampering

JWT Login Flow
Step-by-step:
Client → POST /login → Server
User sends credentials
Server validates them
Server generates JWT
Server sends token to client
Client stores token

[ Client ]
    |
    | 1. Login (email/password)
    v
[ Server ]
    |
    | 2. Validate user
    | 3. Generate JWT
    v
[ Token ]
    |
    | 4. Send back
    v
[ Client stores token ]

Sending Token with Requests

Client includes JWT in headers:

Authorization: Bearer <token>

Example:

GET /profile
Authorization: Bearer rwrwrwrwerwerewrewrddzvdv345678908765432sdfgyrfd


Protecting Routes Using Tokens
Middleware in Node.js (Express)

const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
  const header = req.headers.authorization;

  if (!header) {
    return res.status(401).json({ message: "No token" });
  }

  const token = header.split(" ")[1];

  try {
    const decoded = jwt.verify(token, "your_secret_key");
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ message: "Invalid token" });
  }
}



app.get('/protected', authMiddleware, (req, res) => {
  res.json({ message: "Access granted", user: req.user });
});




Token Validation Lifecycle
[ Request with JWT ]
        |
        v
[ Extract Token ]
        |
        v
[ Verify Signature ]
        |
        v
[ Check Expiry ]
        |
        v
[ Attach User to Request ]
        |
        v
[ Allow / Deny Access ]

Cryptographic Deep Dive
Encoding vs Encryption
JWT uses Base64Url encoding → reversible
NOT encrypted by default


Signing Algorithms
HMAC (Symmetric)
HS256
Same secret for signing & verifying
Faster
Used in most Node apps
RSA (Asymmetric)
RS256
Private key → sign
Public key → verify
More secure in distributed systems

Why Signature Matters

If someone modifies payload:

role: "user" → "admin"

Signature will break → token becomes invalid.
Example Internals
header.payload.signature

Server recomputes:

newSignature === receivedSignature ?

If YES → valid
If NO → tampered
