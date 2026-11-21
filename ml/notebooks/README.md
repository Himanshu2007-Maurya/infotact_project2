# TerraSpectra — Day 7 GitHub Upload

## Contents
- `ml/notebooks/TerraSpectra_Day07_3D_Tensor_Batch_Pipeline.ipynb`

## Task
Prepare spatial-spectral hyperspectral patches and PyTorch DataLoaders for future 3D-CNN model development.

## How to run
1. Open the notebook in Google Colab.
2. Upload `hyperspectral_day04_preprocessed.npy` (preferred), or the Day 2 normalized cube, or the original ENVI `.hdr` and `.dat` pair.
3. Upload `pos_Plant21.csv`.
4. Optionally upload Day 6 coordinate split files.
5. Run the notebook cells from top to bottom.

## Important limitation
The annotation file contains pixel coordinates, not verified healthy/diseased labels. The notebook prepares unlabelled tensors only. It does not train a classifier or claim disease-detection accuracy.

## Suggested commit
`Day 7: Add 3D hyperspectral tensor preparation and PyTorch data loaders`
