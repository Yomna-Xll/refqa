import 'package:flutter/material.dart';
import 'package:refqa/core/constants/app_colors.dart';

// البار اللي فوق فيه اللوجو وزرار Skip
class OnboardingTopBar extends StatelessWidget {
  final bool isLastPage;
  final VoidCallback onSkip;

  const OnboardingTopBar({
    super.key,
    required this.isLastPage,
    required this.onSkip,
  });

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 12),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Image.asset('mobile/assets/images/Container (1).png', height: 28),
           SizedBox(width: 6),

          // بيظهر Skip لو مش في آخر صفحة بس
          if (!isLastPage)
            GestureDetector(
              onTap: onSkip,
              child: const Text(
                'Skip',
                style: TextStyle(
                  color: AppColors.hintTextColor,
                  fontSize: 14,
                  fontWeight: FontWeight.w500,
                ),
              ),
            ),
        ],
      ),
    );
  }
}
