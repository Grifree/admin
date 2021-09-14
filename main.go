package main

import (
	"bytes"
	"github.com/CloudyKit/jet/v6"
	xerr "github.com/goclub/error"
	xhttp "github.com/goclub/http"
	xjson "github.com/goclub/json"
	"log"
	"net/http"
	"reflect"
)

var view *jet.Set

func init (){
	// root := path.Join(os.Getenv("GOPATH"), "github.com/2type/admin",)
	// log.Print(root)
	loader := jet.NewOSFileSystemLoader("./view")
	opts := []jet.Option{}
	opts = append(opts, jet.InDevelopmentMode())
	opts = append(opts, jet.WithDelims("[[", "]]"))
	view = jet.NewSet(
		loader,
		opts...
	)
	view.AddGlobalFunc("xjson", func(a jet.Arguments) reflect.Value {
		v := a.Get(0).Interface()
		buffer := bytes.NewBuffer(nil)
		err := xjson.NewEncoder(buffer).Encode(v) ; if err != nil {
			return reflect.ValueOf("encode json fail")
		}
		return reflect.ValueOf(buffer.Bytes())
	})
}



type Any map[string]interface{}
func main () {
	router := xhttp.NewRouter(xhttp.RouterOption{

	})
	router.HandleFunc(xhttp.Route{xhttp.GET, "/admin/login"}, func(c *xhttp.Context) (err error) {
		t, err := view.GetTemplate("login.html") ; if err != nil { return }
		return t.Execute(c.Writer, nil, Any{})
	})
	router.HandleFunc(xhttp.Route{xhttp.POST, "/admin/login"}, func(c *xhttp.Context) (err error) {
		return c.WriteJSON(struct {
			Jump string `json:"jump"`
			xerr.Resp
		}{
			Jump: "/admin/home",
		})
	})
	router.HandleFunc(xhttp.Route{xhttp.GET, "/admin/home"}, func(c *xhttp.Context) (err error) {
		t, err := view.GetTemplate("home.html") ; if err != nil { return }
		return t.Execute(c.Writer, nil, Any{})
	})

	server := &http.Server{
		Addr: ":4122",
		Handler: router,
	}
	router.LogPatterns(server)
	router.Static("/", "../") // 演示项目,正式项目不要将整个目录作为静态资源
	log.Print(server.ListenAndServe())
}