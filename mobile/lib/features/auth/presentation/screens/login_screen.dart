import 'package:flutter/material.dart';
import 'package:refqa/core/constants/app_colors.dart';
import 'package:refqa/features/auth/presentation/screens/sign_up.dart';
import 'package:refqa/features/auth/presentation/widgets/auth_divider.dart';
import 'package:refqa/features/auth/presentation/widgets/custom_back_button.dart';
import 'package:refqa/features/auth/presentation/widgets/text_field.dart';
import '../widgets/auth_buttons.dart';
import '../widgets/auth_subtitle.dart';
import '../widgets/auth_title.dart';
import '../widgets/password_field.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});

  @override
  State<LoginScreen> createState() => LoginScreenState();
}

class LoginScreenState extends State<LoginScreen> {
  bool rememberMe = false;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.backgroundColor,
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(24.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              CustomBackButton(),
              SizedBox(height: 24),
              AuthTitle(title: 'Welcome back'),
              SizedBox(height: 6),
              AuthSubtitle(
                subtitle:
                    'Sign in to check your route, pass and today\'s trips.',
              ),
              SizedBox(height: 31),
              CustomTextField(
                label: 'Email or phone',
                hintText: 'you@university.edu',
                prefixIcon: Icon(
                  Icons.mail_outline,
                  size: 20,
                  color: AppColors.hintTextColor,
                ),
                keyboardType: TextInputType.emailAddress,
              ),
              SizedBox(height: 20),
              PasswordField(label: 'Password', hintText: '••••••••'),
              SizedBox(height: 21),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Row(
                    children: [
                      SizedBox(
                        width: 24,
                        height: 24,
                        child: Checkbox(
                          value: rememberMe,
                          onChanged: (val) =>
                              setState(() => rememberMe = val ?? false),
                          activeColor: AppColors.blackblueColor,
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(6),
                          ),
                        ),
                      ),
                      SizedBox(width: 8),
                      Text(
                        'Remember me',
                        style: TextStyle(
                          fontSize: 13,
                          color: AppColors.textColor,
                        ),
                      ),
                    ],
                  ),
                  GestureDetector(
                    onTap: () {
                      // Navigate to ForgotPassword / CreatePassword
                    },
                    child: Text(
                      'Forgot password?',
                      style: TextStyle(
                        fontSize: 13,
                        color: AppColors.mainColor,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                  ),
                ],
              ),
              SizedBox(height: 24),
              CustomMainButton(text: 'Log in', onPressed: () {}),
              SizedBox(height: 32),
              AuthDivider(text: 'or'),
              SizedBox(height: 16),
              SocialAuthButton(
                text: 'Continue with Google',
                iconPath: 'assets/icons/google_icon.svg',
                onPressed: () {},
              ),
              SizedBox(height: 12),
              SocialAuthButton(
                text: 'Continue with Apple',
                iconPath: 'assets/icons/apple_icon.svg',
                onPressed: () {},
              ),
              SizedBox(height: 24),
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  const Text(
                    'New to Refqa?  ',
                    style: TextStyle(
                      color: AppColors.hintTextColor,
                      fontSize: 13,
                    ),
                  ),
                  GestureDetector(
                    onTap: () {
                      Navigator.push(
                        context,
                        MaterialPageRoute(
                          builder: (context) => const SignUpScreen(),
                        ),
                      );
                    },
                    child: const Text(
                      'Create an account',
                      style: TextStyle(
                        color: AppColors.blackblueColor,
                        fontWeight: FontWeight.bold,
                        fontSize: 13,
                      ),
                    ),
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}
