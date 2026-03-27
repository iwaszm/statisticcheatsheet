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
    method: "Mann-Whitney U (Wilcoxon Rank-Sum)",
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
  {
    method: "McNemar Test",
    objective: "Compare",
    outcome_type: "Binary",
    counts: "2",
    relationship: "Paired",
    nature: "Categorical (2)",
    assumptions: "Paired binary outcomes, discordant pairs drive inference",
    example: "Did diagnosis status change (Yes/No) before vs. after intervention in the same patients?",
    code: "mcnemar.test(table(pre, post))"
  },
  {
    method: "Cochran's Q Test",
    objective: "Compare",
    outcome_type: "Binary",
    counts: "3+",
    relationship: "Paired",
    nature: "Categorical (2)",
    assumptions: "Related samples with binary outcomes across 3+ conditions",
    example: "Compare pass/fail outcomes for the same participants across 3 teaching methods.",
    code: "DescTools::CochranQTest(as.matrix(df_binary))"
  },
  {
    method: "ANCOVA",
    objective: "Compare",
    outcome_type: "Continuous",
    counts: "2",
    relationship: "Independent",
    nature: "Interval & Normal",
    assumptions: "Linearity of covariate effect, homogeneity of regression slopes, normal residuals",
    example: "Compare post-treatment blood pressure between groups while adjusting for baseline values.",
    code: "anova(lm(y ~ group + covariate, data = df))"
  },
  {
    method: "Kaplan-Meier + Log-rank Test",
    objective: "Compare",
    outcome_type: "Binary",
    counts: "2",
    relationship: "Independent",
    nature: "Time-to-event (censored)",
    assumptions: "Independent censoring, proportional hazards for log-rank interpretation",
    example: "Compare time-to-relapse between two treatment groups.",
    code: "survival::survdiff(survival::Surv(time, event) ~ group, data = df)"
  },

  // --- FIND ASSOCIATIONS ---
  {
    method: "Pearson Correlation",
    objective: "Associate",
    outcome_type: "Continuous",
    counts: "2",
    relationship: "NA",
    nature: "Interval & Normal",
    assumptions: "Linearity, approximate normality, and sensitivity to outliers",
    example: "Correlation between study hours and exam scores.",
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
  {
    method: "Poisson Regression",
    objective: "Predict",
    outcome_type: "Continuous",
    counts: "3+",
    relationship: "NA",
    nature: "Count data",
    assumptions: "Counts are independent, mean approximately equals variance, log link is appropriate",
    example: "Predict number of ER visits from age, comorbidity score, and exposure time.",
    code: "glm(y ~ x1 + x2 + offset(log(exposure)), family = poisson, data = df)"
  },
  {
    method: "Negative Binomial Regression",
    objective: "Predict",
    outcome_type: "Continuous",
    counts: "3+",
    relationship: "NA",
    nature: "Overdispersed count data",
    assumptions: "Counts are independent with overdispersion relative to Poisson",
    example: "Model monthly incident counts when variance is much larger than the mean.",
    code: "MASS::glm.nb(y ~ x1 + x2, data = df)"
  },
  {
    method: "Mixed-Effects Model (LMM/GLMM)",
    objective: "Predict",
    outcome_type: "Continuous",
    counts: "3+",
    relationship: "Paired",
    nature: "Hierarchical / repeated measures",
    assumptions: "Correct random-effects structure, conditional independence, distribution assumptions by family",
    example: "Model repeated blood glucose measurements nested within patients across clinics.",
    code: "lme4::lmer(y ~ x1 + x2 + (1|subject), data = df)"
  },
  {
    method: "Cox Proportional Hazards Model",
    objective: "Predict",
    outcome_type: "Binary",
    counts: "3+",
    relationship: "NA",
    nature: "Time-to-event (censored)",
    assumptions: "Proportional hazards, independent censoring, linear log-hazard effects",
    example: "Estimate hazard of hospitalization from age, treatment, and comorbidities.",
    code: "survival::coxph(survival::Surv(time, event) ~ x1 + x2 + x3, data = df)"
  },
  {
    method: "Random Forest",
    objective: "Predict",
    outcome_type: "Multinomial",
    counts: "3+",
    relationship: "NA",
    nature: "Tabular, non-linear patterns",
    assumptions: "Enough data to average many trees; less interpretable than parametric models",
    example: "Predict disease subtype from demographics, labs, and imaging-derived features.",
    code: "randomForest::randomForest(y ~ ., data = df, ntree = 500)"
  },
  {
    method: "XGBoost",
    objective: "Predict",
    outcome_type: "Multinomial",
    counts: "3+",
    relationship: "NA",
    nature: "Tabular, boosted trees",
    assumptions: "Requires tuning and validation; sensitive to leakage in feature engineering",
    example: "Predict customer churn from high-dimensional behavioral and billing features.",
    code: "xgboost::xgboost(data = X, label = y, objective = 'multi:softprob', nrounds = 200)"
  },
  {
    method: "Support Vector Machine (SVM)",
    objective: "Predict",
    outcome_type: "Binary",
    counts: "3+",
    relationship: "NA",
    nature: "High-dimensional margins",
    assumptions: "Feature scaling matters; kernel and regularization must match signal complexity",
    example: "Classify tumor vs. non-tumor samples from gene expression measurements.",
    code: "e1071::svm(y ~ ., data = df, kernel = 'radial')"
  },
  {
    method: "K-Nearest Neighbors (KNN)",
    objective: "Predict",
    outcome_type: "Multinomial",
    counts: "3+",
    relationship: "NA",
    nature: "Distance-based local structure",
    assumptions: "Meaningful distance metric and scaled features; prediction slows with large datasets",
    example: "Assign a new patient to a severity class using similar prior cases.",
    code: "class::knn(train = X_train, test = X_test, cl = y_train, k = 7)"
  },
  {
    method: "Multilayer Perceptron (MLP)",
    objective: "Predict",
    outcome_type: "Multinomial",
    counts: "3+",
    relationship: "NA",
    nature: "Tabular neural network",
    assumptions: "Needs enough labeled data, regularization, and tuning to outperform simpler baselines",
    example: "Predict fraud category from many nonlinear interactions across transaction features.",
    code: "keras::keras_model_sequential() |> keras::layer_dense(64, activation = 'relu') |> keras::layer_dense(num_classes, activation = 'softmax')"
  },
  {
    method: "Convolutional Neural Network (CNN)",
    objective: "Predict",
    outcome_type: "Multinomial",
    counts: "3+",
    relationship: "NA",
    nature: "Image / spatial grid data",
    assumptions: "Large labeled datasets or transfer learning; local spatial structure is informative",
    example: "Classify skin lesion images into benign and malignant categories.",
    code: "keras::keras_model_sequential() |> keras::layer_conv_2d(32, 3, activation = 'relu', input_shape = c(224, 224, 3)) |> keras::layer_max_pooling_2d() |> keras::layer_dense(num_classes, activation = 'softmax')"
  },
  {
    method: "Recurrent Neural Network (RNN)",
    objective: "Predict",
    outcome_type: "Multinomial",
    counts: "3+",
    relationship: "Paired",
    nature: "Sequential / ordered data",
    assumptions: "Observations are ordered and history matters; plain RNNs struggle with long dependencies",
    example: "Classify patient states from a sequence of hourly monitoring measurements.",
    code: "keras::keras_model_sequential() |> keras::layer_simple_rnn(64, input_shape = c(timesteps, features)) |> keras::layer_dense(num_classes, activation = 'softmax')"
  },
  {
    method: "Long Short-Term Memory (LSTM)",
    objective: "Predict",
    outcome_type: "Continuous",
    counts: "3+",
    relationship: "Paired",
    nature: "Sequential / long-range temporal data",
    assumptions: "Sequence length and temporal dependence justify recurrent memory cells; needs substantial tuning",
    example: "Forecast ICU vital signs using multivariate measurements from prior time steps.",
    code: "keras::keras_model_sequential() |> keras::layer_lstm(64, input_shape = c(timesteps, features)) |> keras::layer_dense(1)"
  },
  {
    method: "ARIMA",
    objective: "Predict",
    outcome_type: "Continuous",
    counts: "1",
    relationship: "Paired",
    nature: "Time series forecasting",
    assumptions: "Series is stationary after differencing and autocorrelation structure is informative",
    example: "Forecast monthly sales from a single historical revenue series.",
    code: "forecast::auto.arima(y) |> forecast::forecast(h = 12)"
  },
  {
    method: "Prophet",
    objective: "Predict",
    outcome_type: "Continuous",
    counts: "1",
    relationship: "Paired",
    nature: "Time series forecasting with trend/seasonality",
    assumptions: "Trend, seasonality, and holiday effects can be represented additively or multiplicatively",
    example: "Forecast daily web traffic with weekly seasonality and holiday effects.",
    code: "prophet::prophet(df_prophet) |> predict(future)"
  },
  {
    method: "Naive Bayes",
    objective: "Predict",
    outcome_type: "Multinomial",
    counts: "3+",
    relationship: "NA",
    nature: "Probabilistic classification",
    assumptions: "Conditional independence approximation is acceptable for predictors",
    example: "Classify support tickets into topic labels from word-count features.",
    code: "e1071::naiveBayes(x = X_train, y = y_train)"
  },
  {
    method: "Bayesian Network",
    objective: "Predict",
    outcome_type: "Multinomial",
    counts: "3+",
    relationship: "NA",
    nature: "Probabilistic graphical model",
    assumptions: "Graph structure is learned or specified reasonably; conditional dependencies are meaningful",
    example: "Predict equipment failure while modeling dependency structure among sensor states.",
    code: "bnlearn::bn.fit(structure, data = df)"
  },
  {
    method: "Bayesian Linear Regression",
    objective: "Predict",
    outcome_type: "Continuous",
    counts: "3+",
    relationship: "NA",
    nature: "Continuous outcome with prior uncertainty",
    assumptions: "Linear signal is plausible and prior distributions encode reasonable domain knowledge",
    example: "Predict house prices while propagating uncertainty in coefficients and predictions.",
    code: "rstanarm::stan_glm(y ~ x1 + x2, data = df, family = gaussian())"
  },
  {
    method: "Bayesian Optimization",
    objective: "Predict",
    outcome_type: "Continuous",
    counts: "3+",
    relationship: "NA",
    nature: "Black-box objective tuning",
    assumptions: "Objective is expensive to evaluate and can be improved by sequential surrogate-guided search",
    example: "Tune gradient boosting hyperparameters to maximize validation AUC with few evaluations.",
    code: "ParBayesianOptimization::bayesOpt(FUN = score_model, bounds = list(max_depth = c(2L, 10L), eta = c(0.01, 0.3)))"
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
    method: "Exact Binomial Proportion CI/Test",
    objective: "SingleGroup",
    outcome_type: "Binary",
    counts: "1",
    relationship: "NA",
    nature: "Categorical (2)",
    assumptions: "Independent Bernoulli trials with binary outcome",
    example: "Estimate and test if adverse event rate differs from 10% in one cohort.",
    code: "binom.test(x, n, p = 0.10, conf.level = 0.95)"
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
];
