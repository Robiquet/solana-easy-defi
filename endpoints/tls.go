package main

import (
	"net/http"
	"strings"
)

var tlsCertificateLocations []string = []string{
	"/etc/letsencrypt/live/radardefi.com",
}

type RedirectHandler struct{}

func (rh RedirectHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	hostDomin := strings.Split(r.Host, ":")[0]
	http.Redirect(w, r, "https://"+hostDomin+":443"+r.URL.Path, http.StatusFound)
}
