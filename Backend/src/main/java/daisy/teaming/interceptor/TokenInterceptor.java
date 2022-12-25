package daisy.teaming.interceptor;


import daisy.teaming.util.JWTUtils;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import com.alibaba.fastjson.JSONObject;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.PrintWriter;

@Component
public class TokenInterceptor implements HandlerInterceptor {
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
//        return true;
        if (request.getMethod().equals("OPTIONS")) {
            response.setStatus(HttpServletResponse.SC_OK);
            return true;
        }

        response.setCharacterEncoding("utf-8");

        String token = request.getHeader("token");
        System.out.println(token);
        if (token != null) {
            boolean result = JWTUtils.verify(token);

            if (result) {
                System.out.println("通过拦截器");
                return true;
            }
        }
        response.setCharacterEncoding("UTF-8");
        response.setContentType("application/json; charset=utf-8");
        PrintWriter out = null;
        try {
            JSONObject json = new JSONObject();
            json.put("success", "false");
            json.put("msg", "认证失败，未通过拦截器");
            json.put("detail", "");
            response.getWriter().append(json.toJSONString());
            System.out.println("认证失败，未通过拦截器");

        } catch (Exception e) {
            e.printStackTrace();
            response.sendError(500);
            return false;
        }


        return false;

    }
}

