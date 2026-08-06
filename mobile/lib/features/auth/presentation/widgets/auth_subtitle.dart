import 'package:flutter/material.dart';
import 'package:refqa/core/constants/app_colors.dart';

class AuthSubtitle extends StatelessWidget {
  final String subtitle;

  const AuthSubtitle({super.key, required this.subtitle});

  @override
  Widget build(BuildContext context) {
    return Text(
      subtitle,
      style: TextStyle(
        fontSize: 13,
        color: AppColors.hintTextColor,
        height: 1.4,
      ),
    );
  }
}
