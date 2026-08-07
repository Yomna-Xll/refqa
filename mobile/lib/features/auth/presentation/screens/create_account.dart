import 'package:flutter/material.dart';
import 'package:refqa/core/constants/app_colors.dart';
import 'package:refqa/features/auth/presentation/screens/login_screen.dart';
import 'package:refqa/features/auth/presentation/screens/sign_up.dart';
import '../widgets/auth_buttons.dart';
import '../widgets/auth_divider.dart';
import '../widgets/auth_subtitle.dart';
import '../widgets/auth_title.dart';

class CreateAccountScreen extends StatelessWidget {
  const CreateAccountScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.backgroundColor,
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(24.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Image.asset('assets/images/app_bar.png', height: 28),
              SizedBox(height: 28),
              AuthTitle(title: 'Create your account'),
              SizedBox(height: 10),
              AuthSubtitle(
                subtitle:
                    'One account for ridesharing, QR boarding and live tracking.',
              ),
              SizedBox(height: 36),
              SocialAuthButton(
                text: 'Continue with Google',
                iconPath: 'assets/icons/google_icon.svg',
                onPressed: () {},
              ),
              SizedBox(height: 16),
              SocialAuthButton(
                text: 'Continue with Apple',
                iconPath: 'assets/icons/apple_icon.svg',
                onPressed: () {},
              ),
              SizedBox(height: 24),
              AuthDivider(text: 'or'),
              SizedBox(height: 24),
              CustomMainButton(
                text: 'Continue with Email',
                onPressed: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (context) => const SignUpScreen(),
                    ),
                  );
                },
              ),
              SizedBox(height: 28),
              Container(
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(16),
                  border: Border.all(color: Color(0xFFE2E8F0)),
                ),
                child: Row(
                  children: [
                    Icon(
                      Icons.info_outline,
                      color: AppColors.blackblueColor,
                      size: 20,
                    ),
                    SizedBox(width: 14),
                    Expanded(
                      child: Text(
                        'Your university pickup station and contact numbers are selected later, options tailored for — not now.',
                        style: TextStyle(
                          fontSize: 12,
                          color: AppColors.hintTextColor,
                          height: 1.4,
                        ),
                      ),
                    ),
                  ],
                ),
              ),
              Spacer(),
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  const Text(
                    'Already registered? ',
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
                          builder: (context) => const LoginScreen(),
                        ),
                      );
                    },
                    child: const Text(
                      'Log in',
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
