import 'package:flutter/material.dart';
import 'package:refqa/core/constants/app_colors.dart';

class AuthTitle extends StatelessWidget {
  final String title;

  const AuthTitle({super.key, required this.title});

  @override
  Widget build(BuildContext context) {
    return Text(
      title,
      style: TextStyle(
        fontSize: 22,
        fontWeight: FontWeight.bold,
        color: AppColors.textColor,
      ),
    );
  }
}
