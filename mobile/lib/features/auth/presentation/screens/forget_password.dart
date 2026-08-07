import 'package:flutter/material.dart';
import 'package:refqa/core/constants/app_colors.dart';
import 'package:refqa/features/auth/presentation/screens/otp.dart';
import 'package:refqa/features/auth/presentation/widgets/auth_divider.dart';
import 'package:refqa/features/auth/presentation/widgets/text_field.dart';
import '../widgets/auth_buttons.dart';
import '../widgets/auth_subtitle.dart';
import '../widgets/auth_title.dart';
import '../widgets/custom_back_button.dart';

class ForgotPasswordScreen extends StatelessWidget {
  const ForgotPasswordScreen({super.key});

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
              Image.asset('assets/images/app_bar.png', height: 28),
              SizedBox(height: 16),
              AuthTitle(title: 'Forgot Password'),
              SizedBox(height: 8),
              AuthSubtitle(
                subtitle:
                    'Enter your registered email address to receive a verification code.',
              ),
              SizedBox(height: 28),
              CustomTextField(label: 'Email', hintText: 'example@email.com'),
              SizedBox(height: 24),
              CustomMainButton(
                text: 'Send Verification Code',
                onPressed: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (context) => OtpVerificationScreen(),
                    ),
                  );
                },
              ),
              const SizedBox(height: 28),

              AuthDivider(text: 'or'),
              const SizedBox(height: 20),
              Center(
                child: GestureDetector(
                  onTap: () {
                    Navigator.pop(context);
                  },
                  child: const Text(
                    'Back to Login',
                    style: TextStyle(
                      fontSize: 14,
                      fontWeight: FontWeight.bold,
                      color: AppColors.blackblueColor,
                    ),
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
