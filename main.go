package main

import (
	"bytes"
	"github.com/CloudyKit/jet/v6"
	xcaptcha "github.com/goclub/captcha"
	xerr "github.com/goclub/error"
	xhttp "github.com/goclub/http"
	xjson "github.com/goclub/json"
	"net/http"
	"reflect"
	"time"
)

var view *jet.Set

func init (){
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

type JetRender struct {

}

func (j JetRender) Render(templatePath string, data interface{}, w http.ResponseWriter) (err error) {
	t, err := view.GetTemplate(templatePath) ; if err != nil {
	    return
	}
	return t.Execute(w, nil, data)
}

type Any map[string]interface{}
type UploadRes struct {
	ID string `json:"id"`
	Filename string `json:"filename"`
	Src string `json:"src"`
	xerr.Resp
}
type ControlRes struct {
	Jump string `json:"jump"`
	JumpArgs []interface{} `json:"jumpArgs"`
	SuccessMessage string `json:"successMessage"`
	xerr.Resp
}
func main () {
	ms := xhttp.NewMockServer(xhttp.MockServerOption{
		DefaultReply: map[string]interface{}{
			"pass": xerr.Resp{},
			"fail": xerr.Resp{
				Error: xerr.RespError{
					Code:    1,
					Message: "xxx错误",
				},
			},
		},
		Render: JetRender{},
	})
	ms.URL(xhttp.Mock{
		Route: xhttp.Route{xhttp.GET, "/"},
		HandleFunc: func(c *xhttp.Context, data interface{}) error {
			http.Redirect(c.Writer, c.Request, "/admin/login", 302)
			return nil
		},
	})
	ms.URL(xhttp.Mock{
		Route:               xhttp.Route{xhttp.POST, "/admin/upload/photo"},
		Reply:               xhttp.MockReply{
			"pass": UploadRes{
				Src: "https://picsum.photos/200/100",
				ID: "https://picsum.photos/200/100",
			},
		},
	})
	ms.URL(xhttp.Mock{
		Route:               xhttp.Route{xhttp.POST, "/admin/upload/file"},
		Reply:               xhttp.MockReply{
			"pass": UploadRes{
				Filename: "abc.csv",
				ID: "some_id",
			},
		},
	})
	ms.URL(xhttp.Mock{
		Route:               xhttp.Route{xhttp.GET, "/admin/login"},
		Render: "login.html",
	})
	ms.URL(xhttp.Mock{
		Route:               xhttp.Route{xhttp.GET, "/admin/logout"},
		HandleFunc: func(c *xhttp.Context, data interface{}) error {
			http.Redirect(c.Writer, c.Request, "/admin/login", 302)
			return nil
		},
	})
	ms.URL(xhttp.Mock{
		Route:               xhttp.Route{xhttp.POST, "/admin/login"},
		Reply:               xhttp.MockReply{
			"pass": ControlRes{
				Jump: "/admin/home",
			},
		},
	})
	ms.URL(xhttp.Mock{
		Route:               xhttp.Route{xhttp.GET, "/admin/home"},
		Render: "home.html",
	})
	ms.URL(xhttp.Mock{
		Route:               xhttp.Route{xhttp.GET, "/admin/demo_list"},
		Render: "demo_list.html",
	})
	ms.URL(xhttp.Mock{
		Route:               xhttp.Route{xhttp.GET, "/admin/demo_update"},
		Render: "demo_form.html",
		Reply:               xhttp.MockReply{
			"pass": Any{
				"formKind": "update",
			},
		},
	})
	ms.URL(xhttp.Mock{
		Route:               xhttp.Route{xhttp.GET, "/admin/demo_create"},
		Render: "demo_form.html",
		Reply:               xhttp.MockReply{
			"pass": Any{
				"formKind": "create",
			},
		},
	})
	ms.URL(xhttp.Mock{
		Route:               xhttp.Route{xhttp.POST, "/admin/demo_create"},
		Reply:               xhttp.MockReply{
			"pass": ControlRes{
				SuccessMessage: "创建成功",
			},
		},
	})
	ms.URL(xhttp.Mock{
		Route:               xhttp.Route{xhttp.GET, "/captcha"},
		HandleFunc: func(c *xhttp.Context, data interface{}) (err error) {
			_, err = xcaptcha.New(c.Writer, xcaptcha.Option{}) ; if err != nil {
				return
			}
			return
		},
	})
	ms.URL(xhttp.Mock{
		Route:               xhttp.Route{xhttp.POST, "/sms/send"},
	})
	ms.URL(xhttp.Mock{
        Route:               xhttp.Route{xhttp.GET, "/admin/mobile"},
        Render: "mobile.html",
    })
	ms.PrefixHandle("/public", NoCacheFileServer{"./"})
	ms.Listen(4122)
}

type NoCacheFileServer struct {
	Dir string
}

func (n NoCacheFileServer) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	w.Header().Add("Cache-control", "no-cache")
	w.Header().Add("Cache-control", "no-store")
	w.Header().Add("Expires", "0")
	w.Header().Add("Last-Modified", time.Now().String())
	w.Header().Add("Pragma", "no-cache")
	http.FileServer(http.Dir(n.Dir)).ServeHTTP(w, r)
}
