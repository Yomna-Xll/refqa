import 'package:flutter/material.dart';
import 'package:refqa/core/constants/app_colors.dart';

class CustomBackButton extends StatelessWidget {
  final VoidCallback? onTap;

  const CustomBackButton({super.key, this.onTap});

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap ?? () => Navigator.maybePop(context),
      child: Container(
        width: 40,
        height: 40,
        decoration: BoxDecoration(
          color: AppColors.backgroundColor,
          shape: BoxShape.circle,
          border: Border.all(color: AppColors.backgroundColor),
        ),
        child: Icon(
          Icons.arrow_back_ios_new,
          size: 16,
          color: AppColors.textColor,
        ),
      ),
    );
  }
}
