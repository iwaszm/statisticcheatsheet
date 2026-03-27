export const descriptiveData = [
  // --- Level 1: Basic Descriptive Statistics ---
  {
    nature: "Continuous",
    method: "Summary Statistics",
    function: "Measure central tendency (Mean, Median) and dispersion (SD, Variance, Range).",
    example: "Summarize height and weight of 100 students to understand the average and spread.",
    code: "summary(df)\nsd(df$height)\npsych::describe(df)"
  },
  {
    nature: "Categorical",
    method: "Frequency Tables (Crosstabs)",
    function: "Count occurrences of categorical variables and show relationships between them.",
    example: "Count how many smokers vs. non-smokers are in different treatment groups.",
    code: "table(df$group, df$outcome)\nprop.table(table(df$group))\nsummarytools::ctable(df$v1, df$v2)"
  },
  {
    nature: "Continuous",
    method: "Q-Q Plot / Normality Checks",
    function: "Visually and statistically assess whether continuous data are approximately normally distributed.",
    example: "Check if residuals from a blood pressure model follow a normal distribution.",
    code: "qqnorm(df$y)\nqqline(df$y, col='red')\nshapiro.test(df$y)"
  },
  {
    nature: "Continuous",
    method: "Boxplot / Violin Plot",
    function: "Visualize distributions, spread, and potential outliers across groups.",
    example: "Compare salary distributions across departments to detect skew and extreme values.",
    code: "boxplot(y ~ group, data=df)\nggplot2::ggplot(df, ggplot2::aes(group, y)) + ggplot2::geom_violin()"
  },
  {
    nature: "Any",
    method: "Missing Data Pattern Analysis",
    function: "Explore missingness structure to identify variable-level and row-level data gaps.",
    example: "Inspect whether clinical lab variables are systematically missing in one study arm.",
    code: "naniar::vis_miss(df)\ncolSums(is.na(df))\nVIM::aggr(df)"
  },
  {
    nature: "Continuous",
    method: "Outlier Detection (IQR / Robust Z-Score)",
    function: "Flag unusually extreme observations using robust, distribution-aware rules.",
    example: "Identify extreme purchase values that could distort downstream summaries.",
    code: "boxplot.stats(df$y)$out\nrstatix::identify_outliers(df, y)\nwhich(abs(scale(df$y)) > 3)"
  },

  // --- Level 2: Dimensionality Reduction & Clustering ---
  {
    nature: "Continuous",
    method: "Principal Component Analysis (PCA)",
    function: "Reduce high-dimensional data into fewer orthogonal components while retaining variance.",
    example: "Condense 50 different survey questions about personality into 5 main traits.",
    code: "pca_res <- prcomp(df, scale. = TRUE)\nsummary(pca_res)\nfactoextra::fviz_pca_ind(pca_res)"
  },
  {
    nature: "Continuous",
    method: "Factor Analysis",
    function: "Extract latent factors that explain covariance among observed variables.",
    example: "Identify latent traits like cognitive ability from multiple test items.",
    code: "factanal(df, factors = 3)"
  },
  {
    nature: "Continuous",
    method: "Exploratory Factor Analysis (EFA)",
    function: "Identify underlying latent factors that explain observed variables.",
    example: "Find latent psychological constructs (e.g., 'Anxiety') from various scale items.",
    code: "library(psych)\nfa(df, nfactors=3, rotate='varimax')"
  },
  {
    nature: "Continuous",
    method: "t-SNE / UMAP",
    function: "Non-linear dimensionality reduction for visualizing high-dimensional clusters.",
    example: "Visualize high-dimensional gene expression data in a 2D plot to see cell types.",
    code: "Rtsne::Rtsne(as.matrix(df))\numap::umap(df)"
  },
  {
    nature: "Continuous",
    method: "K-Means Clustering",
    function: "Partition data into K distinct non-overlapping subgroups (centroids).",
    example: "Segment customers into 3 groups based on purchasing power and frequency.",
    code: "kmeans(df, centers=3, nstart=25)"
  },
  {
    nature: "Continuous",
    method: "Hierarchical Clustering",
    function: "Build a hierarchy of clusters using a dendrogram (Agglomerative or Divisive).",
    example: "Group species into a biological tree based on physical characteristics.",
    code: "dist_mat <- dist(df)\nhclust(dist_mat, method='ward.D2')\nplot(hclust_res)"
  },
  {
    nature: "Continuous",
    method: "DBSCAN",
    function: "Density-based clustering to find arbitrary shaped clusters and identify outliers (noise).",
    example: "Find spatial clusters of crime incidents while ignoring isolated rare events.",
    code: "dbscan::dbscan(df, eps=0.5, minPts=5)"
  },
  {
    nature: "Continuous",
    method: "Gaussian Mixture Models (GMM)",
    function: "Probabilistic clustering assuming data points are generated from a mixture of distributions.",
    example: "Model overlapping height distributions of males and females in a combined dataset.",
    code: "library(mclust)\nMclust(df)"
  }
];
