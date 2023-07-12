package com.czj.util;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class SHAUtil {

    public static final String KEY_SHA = "SHA";
    public static final String ALGORITHM = "SHA-256";

    /***
     * SHA加密（比MD5更安全）
     * @param data
     * @return
     * @throws Exception
     */
    public static byte[] encryptSHA(byte[] data) throws Exception{
        MessageDigest sha = MessageDigest.getInstance(KEY_SHA);
        sha.update(data);
        return sha.digest();
    }

    // 加密
    public static String SHAEncrypt(final String content) {
        try {
            MessageDigest sha = MessageDigest.getInstance(KEY_SHA);
            byte[] sha_byte = sha.digest(content.getBytes());
            StringBuffer hexValue = new StringBuffer();
            for (byte b : sha_byte) {
                //将其中的每个字节转成十六进制字符串：byte类型的数据最高位是符号位，通过和0xff进行与操作，转换为int类型的正整数。
                String toHexString = Integer.toHexString(b & 0xff);
                hexValue.append(toHexString.length() == 1 ? "0" + toHexString : toHexString);
            }
            return hexValue.toString();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return "";
    }

    //SHA-256加密
    public static String SHA256Encrypt(String sourceStr) {
        MessageDigest md = null;
        try {
            md = MessageDigest.getInstance(ALGORITHM);
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        }
        if (null != md) {
            md.update(sourceStr.getBytes());
            String digestStr = getDigestStr(md.digest());
            return digestStr;
        }
        return null;
    }

    private static String getDigestStr(byte[] origBytes) {
        String tempStr = null;
        StringBuilder stb = new StringBuilder();
        for (int i = 0; i < origBytes.length; i++) {
            tempStr = Integer.toHexString(origBytes[i] & 0xff);
            if (tempStr.length() == 1) {
                stb.append("0");
            }
            stb.append(tempStr);

        }
        return stb.toString();
    }
}
