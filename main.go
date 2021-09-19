package main

import (
	"bytes"
	"github.com/CloudyKit/jet/v6"
	xcaptcha "github.com/goclub/captcha"
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
type UploadRes struct {
	ID string `json:"id"`
	Filename string `json:"filename"`
	Src string `json:"src"`
	xerr.Resp
}
func main () {
	router := xhttp.NewRouter(xhttp.RouterOption{

	})
	router.HandleFunc(xhttp.Route{xhttp.POST, "/admin/upload/photo"}, func(c *xhttp.Context) (err error) {
		return c.WriteJSON(UploadRes{
			Src: "https://picsum.photos/100",
			ID: "https://picsum.photos/100",
		})
	})
	router.HandleFunc(xhttp.Route{xhttp.POST, "/admin/upload/file"}, func(c *xhttp.Context) (err error) {
		return c.WriteJSON(UploadRes{
			Filename: "abc.csv",
			ID: "some_id",
		})
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
	router.HandleFunc(xhttp.Route{xhttp.GET, "/admin/demo_list"}, func(c *xhttp.Context) (err error) {
		t, err := view.GetTemplate("demo_list.html") ; if err != nil { return }
		return t.Execute(c.Writer, nil, Any{})
	})
	router.HandleFunc(xhttp.Route{xhttp.GET, "/admin/demo_update"}, func(c *xhttp.Context) (err error) {
		t, err := view.GetTemplate("demo_form.html") ; if err != nil { return }
		return t.Execute(c.Writer, nil, Any{
			"formKind": "update",
		})
	})
	router.HandleFunc(xhttp.Route{xhttp.GET, "/admin/demo_create"}, func(c *xhttp.Context) (err error) {
		t, err := view.GetTemplate("demo_form.html") ; if err != nil { return }
		return t.Execute(c.Writer, nil, Any{
			"formKind": "create",
		})
	})
	router.HandleFunc(xhttp.Route{xhttp.GET, "/captcha"}, func(c *xhttp.Context) (err error) {
		_, err = xcaptcha.New(c.Writer, xcaptcha.Option{}) ; if err != nil {
		    return
		}
		return
	})
	router.HandleFunc(xhttp.Route{xhttp.POST,"/sms/send",}, func(c *xhttp.Context) (err error) {
		return c.WriteJSON(xerr.Resp{})
	})
	server := &http.Server{
		Addr: ":4122",
		Handler: router,
	}
	router.LogPatterns(server)
	router.FileServer("/public", "./") // 演示项目,正式项目不要将整个目录作为静态资源
	log.Print(server.ListenAndServe())
}