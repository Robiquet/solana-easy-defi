package main

var CoingeckoIDMap map[string]string = map[string]string{
	// Serum pools
	"BQcdHdAQW1hczDbBi9hiegXAR7A98Q9jx3X3iBBBDiq4": "tether",
	"Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB": "tether",
	"2FPyTwcZLUg1MDrwsyoP4D6s1tM7hAkHYRjkNb5w6Pxk": "ethereum",
	"3JSf5tPeuscJGtaCp5giEiDhv51gQ4v3zWg8DGgyLfAB": "yearn-finance",
	"9n4nbM75f5Ui33ZbPYXn59EwSgE8CGsHtAeTH5YFeJ9E": "bitcoin",
	"9S4t2NEAiJVMvPdRYKVrfJpBafPBLtvbvyS3DecojQHw": "frontier-token",
	"AGFEad2et2ZJif9jaGpdMixQqvW5i81aBdvKe7PHNfz3": "ftx-token",
	"AR1Mtgh7zAtxuxGd2XPovXPVjcSdY3i4rQYisNadjfKy": "sushi",
	"CsZ5LZkDS7h9TDKjrbL7VAwQZ9nsRu8vJLhRYfmGaN8K": "aleph",
	"CWE8jPTUYhdCTZYWPTe1o5DFqfdjzWKc9WKz6rSjQUdG": "chainlink",
	"DEhAasscXF4kEGxFgJ3bq4PpVGp5wyUxMRvn6TzGVHaw": "uniswap",
	"EchesyfXePKdLtoiZSL8pBe8Myagyy8ZRqsACNCFGnvp": "bonfida",
	"GXMvfY2jpQctDqZ9RoU3oWPhufKiCcFEfchvYumtX7jd": "tomochain",
	"kinXdEcpDQeHPEuQnqmUgtYykqKGVFq6CeVX5iAHJq6":  "kin",
	"MAPS41MDahZ9QdKXhVa4dWB9RuyfV4XqhyAZ8XcYepb":  "maps",
	"So11111111111111111111111111111111111111112":  "solana",
	"SRMuApVNdxXokk5GT7XD5cUUgXMBCoAz2LHeuAoKWRt":  "serum",
	"z3dn17yLaGMKffVogeFHQ9zWVcXgqgf3PQnDsNs2g6M":  "oxygen",
	"EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v": "usd-coin",

	// Raydium pools
	"cope":  "cope",
	"eth":   "ethereum",
	"fida":  "bonfida",
	"kin":   "kin",
	"maps":  "maps",
	"media": "media-network",
	"oxy":   "oxygen",
	"ray":   "raydium",
	"sol":   "solana",
	"srm":   "serum",
	"step":  "step-finance",
	"usdc":  "usd-coin",
	"usdt":  "tether",
}

var PoolIDToCoinIDsMap map[string][2]string = map[string][2]string{
	// Raydium pools
	"COPE-USDC":  {"cope", "usd-coin"},
	"FIDA-RAY":   {"bonfida", "raydium"},
	"KIN-RAY":    {"kin", "raydium"},
	"MAPS-RAY":   {"maps", "raydium"},
	"MEDIA-USDC": {"media-network", "usd-coin"},
	"OXY-RAY":    {"oxygen", "raydium"},
	"RAY":        {"raydium", ""},
	"RAY-ETH":    {"raydium", "ethereum"},
	"RAY-SOL":    {"raydium", "solana"},
	"RAY-SRM":    {"raydium", "serum"},
	"RAY-USDC":   {"raydium", "usd-coin"},
	"RAY-USDT":   {"raydium", "tether"},
	"STEP-USDC":  {"step-finance", "usd-coin"},
	"ALEPH-USDC": {"aleph", "usd-coin"},
	"MER-USDC": {"mer", "usd-coin"},
	"ROPE-USDC": {"rope", "usd-coin"},

}


var PoolIDToUrl map[string]string = map[string]string{
	"COPE-USDC": "https://raydium.io/liquidity/?ammId=DiWxV1SPXPNJRCt5Ao1mJRAxjw97hJVyj8qGzZwFbAFb",
	"FIDA-RAY":  "https://raydium.io/liquidity/?ammId=2dRNngAm729NzLbb1pzgHtfHvPqR4XHFmFyYK78EfEeX",
	"KIN-RAY":  "https://raydium.io/liquidity/?ammId=6kmMMacvoCKBkBrqssLEdFuEZu2wqtLdNQxh9VjtzfwT",
	"MAPS-RAY": "https://raydium.io/liquidity/?ammId=5VyLSjUvaRxsubirbvbfJMbrKZRx1b7JZzuCAfyqgimf",
	"MEDIA-USDC": "https://raydium.io/liquidity/?ammId=94CQopiGxxUXf2avyMZhAFaBdNatd62ttYGoTVQBRGdi",
	"OXY-RAY":  "https://raydium.io/liquidity/?ammId=B5ZguAWAGC3GXVtJZVfoMtzvEvDnDKBPCevsUKMy4DTZ",
	"RAY":  "",    
	"RAY-ETH": "https://raydium.io/liquidity/?ammId=FrDSSYXGcrJc7ZwY5KMfTmzDfrzjvqdxmSinJFwxLr14", 
	"RAY-SOL":  "https://raydium.io/liquidity/?ammId=HeRUVkQyPuJAPFXUkTaJaWzimBopWbJ54q5DCMuPpBY4",
	"RAY-SRM":  "https://raydium.io/liquidity/?ammId=EGhB6FdyHtJPbPMRoBC8eeUVnVh2iRgnQ9HZBKAw46Uy",
	"RAY-USDC": "https://raydium.io/liquidity/?ammId=5NMFfbccSpLdre6anA8P8vVy35n2a52AJiNPpQn8tJnE",
	"RAY-USDT": "https://raydium.io/liquidity/?ammId=DVa7Qmb5ct9RCpaU7UTpSaf3GVMYz17vNVU67XpdCRut",
	"STEP-USDC": "https://raydium.io/liquidity/?ammId=4Sx1NLrQiK4b9FdLKe2DhQ9FHvRzJhzKN3LoD6BrEPnf",
	"ALEPH-USDC": "https://raydium.io/liquidity/?ammId=GDHXjn9wF2zxW35DBkCegWQdoTfFBC9LXt7D5ovJxQ5B",
	"MER-USDC":  "https://raydium.io/liquidity/?ammId=BkfGDk676QFtTiGxn7TtEpHayJZRr6LgNk9uTV2MH4bR",
	"ROPE-USDC": "https://raydium.io/liquidity/?ammId=BuS4ScFcZjEBixF1ceCTiXs4rqt4WDfXLoth7VcM2Eoj",	
}

