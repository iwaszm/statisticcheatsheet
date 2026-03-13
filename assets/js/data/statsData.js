export const statsData = [
  // --- COMPARE DIFFERENCES ---
  {
    method: "Student's t-test",
    objective: "Compare",
    outcome_type: "Continuous",
    counts: "2",
    relationship: "Independent",
    nature: "Interval & Normal",
    assumptions: "Independence, Normality, Equal Variance",
    example: "Compare mean salaries of men vs. women.",
    code: "t.test(y ~ x, var.equal = TRUE)"
  },
  {
    method: "Welch's t-test",
    objective: "Compare",
    outcome_type: "Continuous",
    counts: "2",
    relationship: "Independent",
    nature: "Interval & Normal",
    assumptions: "Independence, Normality (Handles unequal variances)",
    example: "Compare mean heights of two groups with different spreads.",
    code: "t.test(y ~ x, var.equal = FALSE)"
  },
  {
    method: "Paired t-test",
    objective: "Compare",
    outcome_type: "Continuous",
    counts: "2",
    relationship: "Paired",
    nature: "Interval & Normal",
    assumptions: "Differences are normally distributed",
    example: "Blood pressure before and after treatment.",
    code: "t.test(y1, y2, paired = TRUE)"
  },
  {
    method: "One-way ANOVA",
    objective: "Compare",
    outcome_type: "Continuous",
    counts: "3+",
    relationship: "Independent",
    nature: "Interval & Normal",
    assumptions: "Independence, Normality of residuals, Homogeneity",
    example: "Compare weight loss across 3 different diets.",
    code: "summary(aov(y ~ x, data = df))"
  },
  {
    method: "Repeated Measures ANOVA",
    objective: "Compare",
    outcome_type: "Continuous",
    counts: "3+",
    relationship: "Paired",
    nature: "Interval & Normal",
    assumptions: "Normality, Sphericity, No missing data",
    example: "Test scores of students at 3 different time points.",
    code: "aov(y ~ x + Error(subject/x))"
  },
  {
    method: "Mann-Whitney U",
    objective: "Compare",
    outcome_type: "Ordinal",
    counts: "2",
    relationship: "Independent",
    nature: "Ordinal/Interval",
    assumptions: "Independence, Similar distribution shape",
    example: "Compare pain rankings between two drug groups.",
    code: "wilcox.test(y ~ x)"
  },
  {
    method: "Wilcoxon Signed-Rank",
    objective: "Compare",
    outcome_type: "Ordinal",
    counts: "2",
    relationship: "Paired",
    nature: "Ordinal/Interval",
    assumptions: "Symmetric distribution of differences",
    example: "Satisfaction scores (1-10) before and after UI update.",
    code: "wilcox.test(y1, y2, paired = TRUE)"
  },
  {
    method: "Kruskal-Wallis",
    objective: "Compare",
    outcome_type: "Ordinal",
    counts: "3+",
    relationship: "Independent",
    nature: "Ordinal/Interval",
    assumptions: "Independence, Non-normal distributions",
    example: "Compare happiness level (1-5) across 4 cities.",
    code: "kruskal.test(y ~ x)"
  },
  {
    method: "Friedman Test",
    objective: "Compare",
    outcome_type: "Ordinal",
    counts: "3+",
    relationship: "Paired",
    nature: "Ordinal/Interval",
    assumptions: "Matched groups / Repeated measures",
    example: "Same judges rating 3 different wine samples.",
    code: "friedman.test(y ~ x | subject)"
  },

  // --- FIND ASSOCIATIONS ---
  {
    method: "Pearson Correlation",
    objective: "Associate",
    outcome_type: "Continuous",
    counts: "2",
    relationship: "NA",
    nature: "Interval & Normal",
    assumptions: "Linearity, Normality",
    example: "Relationship between study hours and exam scores.",
    code: "cor.test(x, y, method = 'pearson')"
  },
  {
    method: "Spearman's Rho",
    objective: "Associate",
    outcome_type: "Ordinal",
    counts: "2",
    relationship: "NA",
    nature: "Ordinal/Interval",
    assumptions: "Monotonic relationship",
    example: "Correlation between class rank and IQ score.",
    code: "cor.test(x, y, method = 'spearman')"
  },
  {
    method: "Chi-Square (Association)",
    objective: "Associate",
    outcome_type: "Multinomial",
    counts: "2",
    relationship: "Independent",
    nature: "Categorical",
    assumptions: "Expected counts > 5",
    example: "Is hair color associated with eye color?",
    code: "chisq.test(table(x, y))"
  },
  {
    method: "Fisher's Exact Test",
    objective: "Associate",
    outcome_type: "Binary",
    counts: "2",
    relationship: "Independent",
    nature: "Categorical",
    assumptions: "Small sample sizes",
    example: "Association between a rare gene and a specific disease.",
    code: "fisher.test(table(x, y))"
  },

  // --- PREDICT OUTCOMES ---
  {
    method: "Simple Linear Regression",
    objective: "Predict",
    outcome_type: "Continuous",
    counts: "1",
    relationship: "NA",
    nature: "Interval & Normal",
    assumptions: "Linearity, Independence, Normality, Homoscedasticity",
    example: "Predict weight based on height.",
    code: "lm(y ~ x)"
  },
  {
    method: "Multiple Regression",
    objective: "Predict",
    outcome_type: "Continuous",
    counts: "3+",
    relationship: "NA",
    nature: "Interval & Normal",
    assumptions: "No Multicollinearity, Normality of residuals",
    example: "Predict house price using size, age, and location.",
    code: "lm(y ~ x1 + x2 + x3)"
  },
  {
    method: "Logistic Regression",
    objective: "Predict",
    outcome_type: "Binary",
    counts: "3+",
    relationship: "NA",
    nature: "Categorical (2)",
    assumptions: "Independence, Linearity in log odds",
    example: "Predict if a patient has a disease (Yes/No) based on biomarkers.",
    code: "glm(y ~ x1 + x2, family = binomial)"
  },

  // --- TEST SINGLE GROUP ---
  {
    method: "One-sample t-test",
    objective: "SingleGroup",
    outcome_type: "Continuous",
    counts: "1",
    relationship: "NA",
    nature: "Interval & Normal",
    assumptions: "Normality",
    example: "Test if the mean weight of a sample equals 70kg.",
    code: "t.test(y, mu = 70)"
  },
  {
    method: "Z-Test (1 Sample)",
    objective: "SingleGroup",
    outcome_type: "Continuous",
    counts: "1",
    relationship: "NA",
    nature: "Interval & Normal",
    assumptions: "Normality, Known population SD (Sigma)",
    example: "Test if mean IQ equals 100 (SD known to be 15).",
    code: "BSDA::z.test(x, mu=100, sigma.x=15)"
  },
  {
    method: "Binomial Test",
    objective: "SingleGroup",
    outcome_type: "Binary",
    counts: "1",
    relationship: "NA",
    nature: "Categorical (2)",
    assumptions: "Independent trials",
    example: "Test if a coin is fair (heads vs tails).",
    code: "binom.test(x, n, p = 0.5)"
  },
  {
    method: "Chi-Square (Goodness of Fit)",
    objective: "SingleGroup",
    outcome_type: "Multinomial",
    counts: "1",
    relationship: "NA",
    nature: "Categorical",
    assumptions: "Expected counts > 5",
    example: "Check if M&M color distribution matches company claims.",
    code: "chisq.test(table(x), p = expected_props)"
  },

  // --- REDUCTION / STRUCTURE ---
  {
    method: "Principal Component Analysis (PCA)",
    objective: "Reduction",
    outcome_type: "Continuous",
    counts: "3+",
    relationship: "NA",
    nature: "Interval & Normal",
    assumptions: "Sufficient correlation among variables",
    example: "Reduce 50 survey items into 5 core dimensions.",
    code: "prcomp(df, scale. = TRUE)"
  },
  {
    method: "Factor Analysis",
    objective: "Reduction",
    outcome_type: "Continuous",
    counts: "3+",
    relationship: "NA",
    nature: "Interval & Normal",
    assumptions: "Multivariate normality",
    example: "Identify latent traits like 'Intelligence' from test batteries.",
    code: "factanal(df, factors = 3)"
  }
];
