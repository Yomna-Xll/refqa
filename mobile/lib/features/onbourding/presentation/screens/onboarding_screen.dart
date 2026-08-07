import 'package:flutter/material.dart';
import 'package:refqa/core/constants/app_colors.dart';
import 'package:refqa/features/onbourding/data/models/onboarding_model.dart';
import 'package:refqa/features/onbourding/presentation/widgets/onboarding_bottom_buttons.dart';
import 'package:refqa/features/onbourding/presentation/widgets/onboarding_dots_indicator.dart';
import 'package:refqa/features/onbourding/presentation/widgets/onboarding_page_content.dart';
import 'package:refqa/features/onbourding/presentation/widgets/onboarding_top_bar.dart';

class OnboardingScreen extends StatefulWidget {
  const OnboardingScreen({super.key});

  @override
  State<OnboardingScreen> createState() => _OnboardingScreenState();
}

class _OnboardingScreenState extends State<OnboardingScreen> {
  final PageController pageController = PageController();
  int currentIndex = 0;

  @override
  void dispose() {
    pageController.dispose();
    super.dispose();
  }

  void onSkip() {
    pageController.jumpToPage(onboardingPages.length - 1);
  }

  void onNext() {
    if (currentIndex < onboardingPages.length - 1) {
      pageController.nextPage(
        duration: const Duration(milliseconds: 300),
        curve: Curves.easeInOut,
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    final isLastPage = currentIndex == onboardingPages.length - 1;

    return Scaffold(
      backgroundColor: AppColors.backgroundColor,
      body: SafeArea(
        child: Column(
          children: [
            OnboardingTopBar(
              isLastPage: isLastPage,
              onSkip: onSkip,
            ),
            Expanded(
              child: PageView.builder(
                controller: pageController,
                itemCount: onboardingPages.length,
                onPageChanged: (index) {
                  setState(() => currentIndex = index);
                },
                itemBuilder: (context, index) {
                  return OnboardingPageContent(
                    model: onboardingPages[index],
                  );
                },
              ),
            ),

            Padding(
              padding: const EdgeInsets.all(24.0),
              child: Column(
                children: [
                  OnboardingDotsIndicator(
                    count: onboardingPages.length,
                    currentIndex: currentIndex,
                  ),
                  const SizedBox(height: 24),

                  OnboardingBottomButtons(
                    isLastPage: isLastPage,
                    onSkip: onSkip,
                    onNext: onNext,
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}