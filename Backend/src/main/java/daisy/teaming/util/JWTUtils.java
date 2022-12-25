package daisy.teaming.util;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;

import java.util.Calendar;

public class JWTUtils {
    private static final String SIGN="GREAT";

    //生成token
    public static String getToke(String account){
        Calendar instance =Calendar.getInstance();
        instance.add(Calendar.HOUR,10);
        //使用这种方式能够获取令牌
        String token= JWT.create()
                .withClaim("account",account)
                .withExpiresAt(instance.getTime())
                .sign(Algorithm.HMAC256(SIGN));
        return token;
    }
    public static DecodedJWT decode(String token)
    {

        JWTVerifier jwtVerifier= JWT.require(Algorithm.HMAC256(SIGN)).build();
        DecodedJWT verify=jwtVerifier.verify(token);
        return verify;
    }
    public static Boolean verify(String token)
    {
        try{
            JWTVerifier jwtVerifier= JWT.require(Algorithm.HMAC256(SIGN)).build();
            DecodedJWT verify=jwtVerifier.verify(token);
            return true;
        }
        catch(Exception e)
        {
            return false;
        }
    }
}
