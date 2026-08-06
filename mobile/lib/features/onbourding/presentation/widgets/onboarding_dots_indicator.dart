import 'package:flutter/material.dart';
import 'package:refqa/core/constants/app_colors.dart';
// النقط اللي تحت بتوضح للمستخدم هو في أي صفحة من صفحات Onboarding
class OnboardingDotsIndicator extends StatelessWidget {
  final int count;
  final int currentIndex;

  const OnboardingDotsIndicator({
    super.key,
    required this.count,
    required this.currentIndex,
  });

  @override
  Widget build(BuildContext context) {
    return Row(
      children: List.generate(
        count,
        (index) => AnimatedContainer(
          duration: const Duration(milliseconds: 250),
          margin: const EdgeInsets.only(right: 6),
          height: 6,
          width: currentIndex == index ? 20 : 6,
          decoration: BoxDecoration(
            color: currentIndex == index
                ? AppColors.blackblueColor
                : const Color(0xFFE2E8F0),
            borderRadius: BorderRadius.circular(3),
          ),
        ),
      ),
    );
  }
}