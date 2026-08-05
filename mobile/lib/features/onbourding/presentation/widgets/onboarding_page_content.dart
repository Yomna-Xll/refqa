import 'package:flutter/material.dart';
import 'package:refqa/core/constants/app_colors.dart';
import '../../data/models/onboarding_model.dart';

class OnboardingPageContent extends StatelessWidget {
  final OnboardingModel model;

  const OnboardingPageContent({super.key, required this.model});
  // Dynamic content: changes from page to page
  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      padding: const EdgeInsets.symmetric(horizontal: 24.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const SizedBox(height: 20),
          // Image retrieved/sourced from the Onboarding Modal
          Center(
            child: Image.asset(
              model.imagePath,
              height: 220,
              fit: BoxFit.contain,
            ),
          ),
          const SizedBox(height: 32),

          // tag & title retrieved/sourced from the Onboarding Modal
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
            decoration: BoxDecoration(
              color: AppColors.containerColor,
              borderRadius: BorderRadius.circular(12),
            ),
            child: Text(
              model.tag,
              style: const TextStyle(
                color: AppColors.text2Color,
                fontSize: 11,
                fontWeight: FontWeight.bold,
                letterSpacing: 0.8,
              ),
            ),
          ),

          SizedBox(height: 16),
          Text(
            model.title,
            style: const TextStyle(
              fontSize: 24,
              fontWeight: FontWeight.bold,
              color: AppColors.textColor,
              height: 1.2,
            ),
          ),
          const SizedBox(height: 12),
          Text(
            model.description,
            style: const TextStyle(
              fontSize: 14,
              color: AppColors.hintTextColor,
              height: 1.5,
            ),
          ),
        ],
      ),
    );
  }
}
