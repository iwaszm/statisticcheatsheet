export const statsData = [
  { dv: "1", iv: "0 IVs", nature: "Interval & Normal", method: "One-sample t-test", assumptions: "Independence, Normality", example: "Test if the mean IQ of a class is 100.", code: "t.test(y, mu = 100)" },
  { dv: "1", iv: "0 IVs", nature: "Ordinal/Interval", method: "One-sample median", assumptions: "Independence", example: "Test if the median income is $50k.", code: "wilcox.test(y, mu = 50000)" },
  { dv: "1", iv: "0 IVs", nature: "Categorical (2)", method: "Binomial test", assumptions: "Independence, Dichotomous", example: "Test if a coin is fair.", code: "binom.test(x, n, p = 0.5)" },
  { dv: "1", iv: "0 IVs", nature: "Categorical", method: "Chi-square goodness-of-fit", assumptions: "Independence, Expected count > 5", example: "Test if M&Ms colors are equally distributed.", code: "chisq.test(table(x))" },

  { dv: "1", iv: "1 IV, 2 levels (Independent)", nature: "Interval & Normal", method: "Welch's 2-Sample t-test", assumptions: "Independence, Normality. (NO equal variance needed)", example: "Compare mean salaries of men vs. women.", code: "t.test(y ~ x, var.equal = FALSE)" },
  { dv: "1", iv: "1 IV, 2 levels (Independent)", nature: "Interval & Normal", method: "Student's t-test", assumptions: "Independence, Normality, Homogeneity of variance", example: "Same as above, strictly assuming equal variances.", code: "t.test(y ~ x, var.equal = TRUE)" },
  { dv: "1", iv: "1 IV, 2 levels (Independent)", nature: "Ordinal/Interval", method: "Wilcoxon-Mann Whitney", assumptions: "Independence, Similar distribution shape", example: "Compare pain rankings (Drug A vs B).", code: "wilcox.test(y ~ x)" },
  { dv: "1", iv: "1 IV, 2 levels (Independent)", nature: "Categorical", method: "Chi-square / Fisher's Exact", assumptions: "Independence, Expected count > 5", example: "Is gender associated with exam pass rate?", code: "chisq.test(table(x, y))" },

  { dv: "1", iv: "1 IV, 2+ levels (Independent)", nature: "Interval & Normal", method: "One-way ANOVA", assumptions: "Independence, Normality of residuals, Homogeneity", example: "Compare weight loss across 3 different diets.", code: "summary(aov(y ~ x, data = df))" },
  { dv: "1", iv: "1 IV, 2+ levels (Independent)", nature: "Ordinal/Interval", method: "Kruskal Wallis", assumptions: "Independence, Similar distribution shape", example: "Compare satisfaction ratings across 3 stores.", code: "kruskal.test(y ~ x)" },

  { dv: "1", iv: "1 IV, 2 levels (Dependent)", nature: "Interval & Normal", method: "Paired t-test", assumptions: "Pairs are independent, Diffs normally distributed", example: "Compare blood pressure BEFORE and AFTER meds.", code: "t.test(y1, y2, paired = TRUE)" },
  { dv: "1", iv: "1 IV, 2 levels (Dependent)", nature: "Ordinal/Interval", method: "Wilcoxon signed ranks", assumptions: "Pairs are independent, Symmetric diffs", example: "Pain scores (1-10) before and after therapy.", code: "wilcox.test(y1, y2, paired=T)" },
  { dv: "1", iv: "1 IV, 2 levels (Dependent)", nature: "Categorical", method: "McNemar test", assumptions: "Matched pairs, Binary outcome", example: "Proportion of smokers before and after an ad.", code: "mcnemar.test(table(x, y))" },

  { dv: "1", iv: "1 IV, 2+ levels (Dependent)", nature: "Interval & Normal", method: "Repeated Measures ANOVA", assumptions: "Normality, Sphericity, NO missing data allowed", example: "Math scores of SAME students at Week 1, 2, 3.", code: "aov(y ~ x + Error(subject/x))" },
  { dv: "1", iv: "1 IV, 2+ levels (Dependent)", nature: "Interval & Normal", method: "Linear Mixed Model (LMM)", assumptions: "Normality of residuals, Handles missing data", example: "Same design as rmANOVA, better for missing data.", code: "lmer(y ~ x + (1|subject))" },
  { dv: "1", iv: "1 IV, 2+ levels (Dependent)", nature: "Ordinal/Interval", method: "Friedman test", assumptions: "Matched groups", example: "Same judges rating 3 coffee flavors.", code: "friedman.test(y ~ x | subject)" },

  { dv: "1", iv: "2+ IVs (Independent)", nature: "Interval & Normal", method: "Factorial ANOVA", assumptions: "Independence, Normality, Homogeneity", example: "Effect of Diet AND Gender on weight loss.", code: "summary(aov(y ~ x1 * x2))" },

  { dv: "1", iv: "Regression", nature: "Interval & Normal", method: "Multiple Regression", assumptions: "Linearity, Independence, Normality, Homoscedasticity", example: "Predict house price based on size and age.", code: "lm(y ~ x1 + x2, data = df)" },
  { dv: "1", iv: "Regression", nature: "Categorical (2)", method: "Multiple Logistic Regression", assumptions: "Independence, Linearity in log odds", example: "Predict loan default (Yes/No) based on income.", code: "glm(y ~ x1+x2, family=binomial)" },
  { dv: "1", iv: "Regression", nature: "Categorical", method: "Discriminant Analysis", assumptions: "Multivariate normality, Equal covariance", example: "Predict career path based on tests.", code: "MASS::lda(y ~ x1 + x2)" },

  { dv: "1", iv: "Mixed", nature: "Interval & Normal", method: "Linear Mixed Model (LMM)", assumptions: "Linearity, Normality, Homoscedasticity", example: "Predict scores from age, accounting for schools.", code: "lme4::lmer(y ~ x1 + (1|school))" },

  { dv: "2+", iv: "1 IV, 2+ levels (Independent)", nature: "Interval & Normal", method: "One-way MANOVA", assumptions: "Multivariate normality, Homogeneity of covariance", example: "Do teaching methods affect Math AND Reading?", code: "manova(cbind(y1,y2) ~ x)" },

  { dv: "0", iv: "0 IVs", nature: "Interval & Normal", method: "Factor Analysis / PCA", assumptions: "Sufficient correlation, Multivariate normality", example: "Group 20 questions into 4 psychological factors.", code: "factanal(df, factors = 4)" }
];
