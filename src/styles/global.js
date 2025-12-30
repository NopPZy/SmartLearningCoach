import { StyleSheet } from 'react-native';
import colors from './colors';
import typography from './typography';
import spacing from './spacing';

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: spacing[4],
  },
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  card: {
    backgroundColor: colors.cardBackground,
    borderRadius: spacing.borderRadius.lg,
    padding: spacing[4],
    elevation: 5,
    marginVertical: spacing[2],
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  textCenter: {
    textAlign: 'center',
  },
  heading1: {
    fontSize: typography.sizes['3xl'],
    fontWeight: typography.weights.bold,
    color: colors.textPrimary,
    marginBottom: spacing[4],
  },
  heading2: {
    fontSize: typography.sizes['2xl'],
    fontWeight: typography.weights.semibold,
    color: colors.textPrimary,
    marginBottom: spacing[3],
  },
  heading3: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.medium,
    color: colors.textPrimary,
    marginBottom: spacing[2],
  },
  body: {
    fontSize: typography.sizes.base,
    color: colors.textPrimary,
    lineHeight: typography.lineHeights.normal * typography.sizes.base,
  },
  caption: {
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: spacing[3],
    paddingHorizontal: spacing[6],
    borderRadius: spacing.borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: colors.white,
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.semibold,
  },
  input: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: spacing.borderRadius.md,
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[3],
    fontSize: typography.sizes.base,
    color: colors.textPrimary,
  },
});

export default globalStyles;