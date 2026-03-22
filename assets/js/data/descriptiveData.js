export const descriptiveData = [
  // --- Level 1: Basic Descriptive Statistics ---
  {
    level: 1,
    method: "Summary Statistics",
    function: "Measure central tendency (Mean, Median) and dispersion (SD, Variance, Range).",
    example: "Summarize height and weight of 100 students to understand the average and spread.",
    code: "summary(df)\nsd(df$height)\npsych::describe(df)"
  },
  {
    level: 1,
    method: "Frequency Tables (Crosstabs)",
    function: "Count occurrences of categorical variables and show relationships between them.",
    example: "Count how many smokers vs. non-smokers are in different treatment groups.",
    code: "table(df$group, df$outcome)\nprop.table(table(df$group))\nsummarytools::ctable(df$v1, df$v2)"
  },
  {
    level: 1,
    method: "Pearson Correlation",
    function: "Measure linear relationship between two continuous variables.",
    example: "Check if there is a linear link between study hours and exam scores.",
    code: "cor(df$hours, df$score, method='pearson')\ncor.test(df$hours, df$score)"
  },
  {
    level: 1,
    method: "Spearman / Kendall Rank Correlation",
    function: "Measure monotonic relationships (non-linear) or associations between ordinal data.",
    example: "Relate race finishing rank to athlete's self-reported fitness level.",
    code: "cor(df$rank, df$fitness, method='spearman')\ncor.test(x, y, method='kendall')"
  },

  // --- Level 2: Dimensionality Reduction & Clustering ---
  {
    level: 2,
    method: "Principal Component Analysis (PCA)",
    function: "Reduce high-dimensional data into fewer orthogonal components while retaining variance.",
    example: "Condense 50 different survey questions about personality into 5 main traits.",
    code: "pca_res <- prcomp(df, scale. = TRUE)\nsummary(pca_res)\nfactoextra::fviz_pca_ind(pca_res)"
  },
  {
    level: 2,
    method: "Exploratory Factor Analysis (EFA)",
    function: "Identify underlying latent factors that explain observed variables.",
    example: "Find latent psychological constructs (e.g., 'Anxiety') from various scale items.",
    code: "library(psych)\nfa(df, nfactors=3, rotate='varimax')"
  },
  {
    level: 2,
    method: "t-SNE / UMAP",
    function: "Non-linear dimensionality reduction for visualizing high-dimensional clusters.",
    example: "Visualize high-dimensional gene expression data in a 2D plot to see cell types.",
    code: "Rtsne::Rtsne(as.matrix(df))\numap::umap(df)"
  },
  {
    level: 2,
    method: "K-Means Clustering",
    function: "Partition data into K distinct non-overlapping subgroups (centroids).",
    example: "Segment customers into 3 groups based on purchasing power and frequency.",
    code: "kmeans(df, centers=3, nstart=25)"
  },
  {
    level: 2,
    method: "Hierarchical Clustering",
    function: "Build a hierarchy of clusters using a dendrogram (Agglomerative or Divisive).",
    example: "Group species into a biological tree based on physical characteristics.",
    code: "dist_mat <- dist(df)\nhclust(dist_mat, method='ward.D2')\nplot(hclust_res)"
  },
  {
    level: 2,
    method: "DBSCAN",
    function: "Density-based clustering to find arbitrary shaped clusters and identify outliers (noise).",
    example: "Find spatial clusters of crime incidents while ignoring isolated rare events.",
    code: "dbscan::dbscan(df, eps=0.5, minPts=5)"
  },
  {
    level: 2,
    method: "Gaussian Mixture Models (GMM)",
    function: "Probabilistic clustering assuming data points are generated from a mixture of distributions.",
    example: "Model overlapping height distributions of males and females in a combined dataset.",
    code: "library(mclust)\nMclust(df)"
  }
];
