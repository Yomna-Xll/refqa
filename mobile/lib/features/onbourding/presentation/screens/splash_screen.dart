import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:refqa/core/constants/app_colors.dart';
import 'package:refqa/features/onbourding/presentation/screens/onboarding_screen.dart';

class SplashScreen extends StatefulWidget {
  const SplashScreen({super.key});

  @override
  State<SplashScreen> createState() => SplashScreenState();
}

class SplashScreenState extends State<SplashScreen>
    with SingleTickerProviderStateMixin {
  late AnimationController controller;
  late Animation<double> animation;

  @override
  void initState() {
    super.initState();

    controller = AnimationController(
      vsync: this,
      duration: const Duration(seconds: 3),
    );

    animation = Tween<double>(begin: 0.0, end: 1.0).animate(controller)
      ..addListener(() {
        setState(() {});
      });

    controller.forward().then((_) {
      if (mounted) {
        Navigator.pushReplacement(
          context,
          MaterialPageRoute(builder: (context) => const OnboardingScreen()),
        );
      }
    });
  }

  @override
  void dispose() {
    controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Stack(
        children: [
          Container(
            decoration: BoxDecoration(
              gradient: LinearGradient(
                begin: Alignment.topCenter,
                end: Alignment.bottomCenter,
                colors: [AppColors.mainColor, AppColors.blackblueColor],
              ),
            ),
          ),

          Positioned(
            top: -100,
            left: -100,
            child: Container(
              width: 300,
              height: 300,
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                border: Border.all(
                  color: AppColors.backgroundColor.withOpacity(0.12),
                  width: 35,
                ),
              ),
            ),
          ),

          Positioned(
            bottom: -80,
            right: -80,
            child: Container(
              width: 320,
              height: 320,
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                border: Border.all(
                  color: AppColors.backgroundColor.withOpacity(0.12),
                  width: 40,
                ),
              ),
            ),
          ),

          Center(
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                Image.asset(
                  'assets/images/app.png',
                  width: 200,
                  height: 200,
                ),

                SizedBox(height: 24),
                Text(
                  'RIDE SMART  ·  ARRIVE ON TIME',
                  style: TextStyle(
                    color: AppColors.backgroundColor,
                    fontSize: 12,
                    fontWeight: FontWeight.w600,
                    letterSpacing: 1.8,
                  ),
                ),
              ],
            ),
          ),

          Positioned(
            bottom: 60,
            left: 40,
            right: 40,
            child: Column(
              children: [
                ClipRRect(
                  borderRadius: BorderRadius.circular(10),
                  child: LinearProgressIndicator(
                    value: animation.value,
                    backgroundColor: AppColors.backgroundColor.withOpacity(
                      0.25,
                    ),
                    color: AppColors.backgroundColor,
                    minHeight: 4,
                  ),
                ),
                const SizedBox(height: 16),
                Text(
                  'Preparing your route...',
                  style: TextStyle(
                    color: AppColors.backgroundColor.withOpacity(0.8),
                    fontSize: 13,
                    fontWeight: FontWeight.w400,
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
