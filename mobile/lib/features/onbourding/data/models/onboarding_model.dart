class OnboardingModel {
  final String imagePath;
  final String tag;
  final String title;
  final String description;

  const OnboardingModel({
    required this.imagePath,
    required this.tag,
    required this.title,
    required this.description,
  });
}

final List<OnboardingModel> onboardingPages = const [
  OnboardingModel(
    imagePath: 'mobile/assets/images/onboarding1.png',
    tag: 'CAMPUS MOBILITY',
    title: 'Your campus ride, finally organised',
    description:
        'Refqa connects every university route, stop and departure into one calm daily commute you can rely on.',
  ),
  OnboardingModel(
    imagePath: 'mobile/assets/images/onboarding2.png',
    tag: 'SMART QR BOARDING',
    title: 'Board Faster with QR',
    description:
        'Scan your QR code and board your assigned bus in seconds. No paperwork, no waiting.',
  ),
  OnboardingModel(
    imagePath: 'mobile/assets/images/onboarding3.png',
    tag: 'CAMPUS STOPS',
    title: 'Wait Smarter at Your Stop',
    description:
        'See your assigned stop, your bus schedule and who\'s riding with you — so you arrive right on time.',
  ),
];