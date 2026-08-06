import 'package:flutter/material.dart';
import 'package:refqa/core/constants/app_colors.dart';

class PasswordField extends StatefulWidget {
  final String label;
  final String hintText;
  final TextEditingController? controller;

  const PasswordField({
    super.key,
    this.label = 'Password',
    this.hintText = '••••••••',
    this.controller,
  });

  @override
  State<PasswordField> createState() => PasswordFieldState();
}

class PasswordFieldState extends State<PasswordField> {
  bool isObscure = true;

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          widget.label,
          style: const TextStyle(
            fontSize: 12,
            fontWeight: FontWeight.w600,
            color: AppColors.textColor,
          ),
        ),
        const SizedBox(height: 6),
        TextFormField(
          controller: widget.controller,
          obscureText: isObscure,
          decoration: InputDecoration(
            hintText: widget.hintText,
            hintStyle: const TextStyle(color: AppColors.hintTextColor, fontSize: 13),
            filled: true,
            fillColor: AppColors.backgroundColor,
            contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
            enabledBorder: OutlineInputBorder(
              borderRadius: BorderRadius.circular(12),
              borderSide: const BorderSide(color: AppColors.backgroundColor),
            ),
            focusedBorder: OutlineInputBorder(
              borderRadius: BorderRadius.circular(12),
              borderSide: const BorderSide(color: AppColors.blackblueColor, width: 1.5),
            ),
            suffixIcon: IconButton(
              icon: Icon(
                isObscure ? Icons.visibility_off_outlined : Icons.visibility_outlined,
                size: 20,
                color: AppColors.hintTextColor,
              ),
              onPressed: () {
                setState(() {
                  isObscure = !isObscure;
                });
              },
            ),
          ),
        ),
      ],
    );
  }
}