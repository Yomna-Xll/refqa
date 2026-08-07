import 'package:flutter/material.dart';
import 'package:refqa/core/constants/app_colors.dart';
import 'package:refqa/features/auth/presentation/widgets/text_field.dart';
import '../widgets/auth_buttons.dart';
import '../widgets/auth_subtitle.dart';
import '../widgets/auth_title.dart';
import '../widgets/custom_back_button.dart';
import '../widgets/password_field.dart';

class SignUpScreen extends StatelessWidget {
  const SignUpScreen({super.key});

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
              SizedBox(height: 20),
              AuthTitle(title: 'Sign up with email'),
              SizedBox(height: 6),
              AuthSubtitle(
                subtitle: 'Three details is all we need to get you moving.',
              ),
              SizedBox(height: 28),
              CustomTextField(
                label: 'Full name',
                hintText: 'Layla Al-Hassan',
                prefixIcon: Icon(
                  Icons.person_outline,
                  size: 20,
                  color: AppColors.hintTextColor,
                ),
              ),
              SizedBox(height: 16),
              CustomTextField(
                label: 'Email',
                hintText: 'you@university.edu',
                prefixIcon: Icon(
                  Icons.mail_outline,
                  size: 20,
                  color: AppColors.hintTextColor,
                ),
                keyboardType: TextInputType.emailAddress,
              ),
              SizedBox(height: 16),
              PasswordField(label: 'Password', hintText: '••••••••'),
              SizedBox(height: 12),
              Text(
                'At least 8 characters, 1 lowercase letter.',
                style: TextStyle(fontSize: 13, color: AppColors.hintTextColor),
              ),
              SizedBox(height: 28),
              CustomMainButton(
                text: 'Create account',
                onPressed: () {
                  // Navigate to OtpVerificationScreen
                },
              ),
              SizedBox(height: 18),
              Center(
                child: Text(
                  'By continuing you agree to Refqa\'s Terms of Service andPrivacy Policy.',
                  textAlign: TextAlign.center,
                  style: TextStyle(
                    fontSize: 13,
                    color: AppColors.hintTextColor,
                    height: 1.4,
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
