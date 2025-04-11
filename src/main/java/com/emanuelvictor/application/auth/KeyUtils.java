//package com.emanuelvictor.application.auth;
//
//
//import java.security.KeyPair;
//import java.security.KeyPairGenerator;
//
//public class KeyUtils {
//
//    public static RSAKey generateRsa() {
//        try {
//            KeyPairGenerator generator = KeyPairGenerator.getInstance("RSA");
//            generator.initialize(2048);
//            KeyPair keyPair = generator.generateKeyPair();
//
//            return new RSAKey.Builder((java.security.interfaces.RSAPublicKey) keyPair.getPublic())
//                    .privateKey((java.security.interfaces.RSAPrivateKey) keyPair.getPrivate())
//                    .keyID("chave-id")
//                    .build();
//        } catch (Exception e) {
//            throw new RuntimeException(e);
//        }
//    }
//}
