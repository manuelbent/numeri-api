type Fields = string[]|undefined

type Query = { [key: string]: any }|string|number|boolean|null

type RequestArgs = { fields: Fields, query: Query }
