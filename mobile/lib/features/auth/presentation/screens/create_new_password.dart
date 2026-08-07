import 'package:flutter/material.dart';
import 'package:refqa/core/constants/app_colors.dart';
import 'package:refqa/features/auth/presentation/screens/password_done.dart';
import '../widgets/auth_buttons.dart';
import '../widgets/auth_subtitle.dart';
import '../widgets/auth_title.dart';
import '../widgets/custom_back_button.dart';
import '../widgets/password_field.dart';

class CreatePasswordScreen extends StatelessWidget {
  const CreatePasswordScreen({super.key});

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
              AuthTitle(title: 'Create a new password'),
              SizedBox(height: 7),
              AuthSubtitle(
                subtitle: 'Choose something you haven\'t used before on Refqa.',
              ),
              SizedBox(height: 30),
              PasswordField(label: 'New password', hintText: '••••••••'),
              SizedBox(height: 20),
              Row(
                children: List.generate(
                  4,
                  (index) => Expanded(
                    child: Container(
                      height: 4,
                      margin: EdgeInsets.only(right: index == 3 ? 0 : 6),
                      decoration: BoxDecoration(
                        color: Color(0xFFE2E8F0),
                        borderRadius: BorderRadius.circular(2),
                      ),
                    ),
                  ),
                ),
              ),

              SizedBox(height: 8),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(
                    '8+ characters, a number and a capital letter',
                    style: TextStyle(
                      fontSize: 11,
                      color: AppColors.hintTextColor,
                    ),
                  ),
                  Text(
                    'Too short',
                    style: TextStyle(
                      fontSize: 11,
                      color: Colors.red,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ],
              ),
              SizedBox(height: 20),
              PasswordField(label: 'Confirm password', hintText: '••••••••'),
              SizedBox(height: 28),
              CustomMainButton(
                text: 'Reset password',
                onPressed: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (context) => PasswordUpdatedScreen(),
                    ),
                  );
                },
              ),
            ],
          ),
        ),
      ),
    );
  }
}
