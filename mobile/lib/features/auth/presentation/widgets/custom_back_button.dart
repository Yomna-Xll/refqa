import 'package:flutter/material.dart';
import 'package:refqa/core/constants/app_colors.dart';

class CustomBackButton extends StatelessWidget {
  final VoidCallback? onTap;

  const CustomBackButton({super.key, this.onTap});

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap ?? () => Navigator.pop(context),
      child: Container(
        width: 50,
        height: 50,
        decoration: BoxDecoration(
          color: Colors.white,
          shape: BoxShape.circle,
          border: Border.all(color: const Color(0xFFE2E8F0), width: 1),
        ),
        child: const Center(
          child: Icon(
            Icons.arrow_back_ios_new,
            size: 16,
            color: AppColors.textColor,
          ),
        ),
      ),
    );
  }
}
