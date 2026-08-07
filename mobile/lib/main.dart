import 'package:flutter/material.dart';
import 'package:refqa/features/auth/presentation/screens/create_account.dart';
import 'package:refqa/features/auth/presentation/screens/forget_password.dart';
import 'package:refqa/features/auth/presentation/screens/otp.dart';
import 'package:refqa/features/auth/presentation/screens/sign_up.dart';
import 'package:refqa/features/onbourding/presentation/screens/onboarding_screen.dart';
import 'package:refqa/features/onbourding/presentation/screens/splash_screen.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
      ),

      home: SplashScreen(),
    );
  }
}
