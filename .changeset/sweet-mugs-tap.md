---
'@mymoid/api': minor
'nextjs': patch
---

Previously we exported content using snake case types. To facilitate the use of camel case types on the client side, we introduced a generic Camelize type for conversion. Recognising the prevalent use of camel case in front-end development, we have simplified the process by eliminating the need for type transformation. Now, types are exported directly into camel case.
