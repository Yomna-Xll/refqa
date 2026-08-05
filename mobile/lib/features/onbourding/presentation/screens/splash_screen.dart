import 'package:flutter/material.dart';
import 'package:refqa/core/constants/app_colors.dart';
import 'package:flutter_svg/flutter_svg.dart';

class SplashScreen extends StatelessWidget {
  const SplashScreen({super.key});

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

          //// Add the top circular
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

          //// Add the bottom circular
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

          /// Add the logo and text in the center
          Center(
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                // Add the logo
                SvgPicture.asset(
                  'assets/icons/logo.svg',
                  height: 100,
                  colorFilter: const ColorFilter.mode(
                    AppColors.backgroundColor,
                    BlendMode.srcIn,
                  ),
                ),

                SizedBox(height: 24),
                // Add the text below the logo
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
          // Add the progress indicator and text at the bottom
          Positioned(
            bottom: 60,
            left: 40,
            right: 40,
            child: Column(
              children: [
                // Add the progress indicator
                ClipRRect(
                  borderRadius: BorderRadius.circular(10),
                  child: LinearProgressIndicator(
                    value: 0.4,
                    backgroundColor: AppColors.backgroundColor.withOpacity(0.25),
                    color: AppColors.backgroundColor,
                    minHeight: 4,
                  ),
                ),
                SizedBox(height: 16),
                // Add the text below the progress indicator
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
