const express = require("express");
const Toilet = require("../models/toilet");
const router = express.Router();

/**
 * @swagger
 * /toilets/{id}/images:
 *   post:
 *     summary: Add images to a toilet by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: The updated toilet
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Toilet'
 */
router.post("/toilets/:id/images", async (req, res) => {
  const toilet = await Toilet.findByPk(req.params.id);
  if (toilet) {
    const images = req.body.images;
    toilet.images = toilet.images.concat(images);
    await toilet.save();
    res.json(toilet);
  } else {
    res.status(404).send("Not found");
  }
});

/**
 * @swagger
 * /toilets/{id}/reviews:
 *   post:
 *     summary: Add a review to a toilet by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user:
 *                 type: string
 *               text:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: byte
 *     responses:
 *       200:
 *         description: The updated toilet
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Toilet'
 */
router.post("/toilets/:id/reviews", async (req, res) => {
  const toilet = await Toilet.findByPk(req.params.id);
  if (toilet) {
    const review = {
      user: req.body.user,
      text: req.body.text,
      image: req.body.image,
    };
    const existingReview = toilet.reviews.find((r) => r.user === review.user);
    if (existingReview) {
      return res.status(400).send("User has already submitted a review");
    }
    toilet.reviews.push(review);
    await toilet.save();
    res.json(toilet);
  } else {
    res.status(404).send("Not found");
  }
});

/**
 * @swagger
 * /toilets/{id}/reviews:
 *   delete:
 *     summary: Delete a review from a toilet by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user:
 *                 type: string
 *     responses:
 *       200:
 *         description: The updated toilet
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Toilet'
 */
router.delete("/toilets/:id/reviews", async (req, res) => {
  const toilet = await Toilet.findByPk(req.params.id);
  if (toilet) {
    const user = req.body.user;
    const reviewIndex = toilet.reviews.findIndex((r) => r.user === user);
    if (reviewIndex === -1) {
      return res.status(400).send("User has not submitted a review");
    }
    toilet.reviews.splice(reviewIndex, 1);
    await toilet.save();
    res.json(toilet);
  } else {
    res.status(404).send("Not found");
  }
});

/**
 * @swagger
 * /toilets:
 *   post:
 *     summary: Create a new toilet
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Toilet'
 *     responses:
 *       200:
 *         description: The created toilet
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Toilet'
 */
router.post("/toilets", async (req, res) => {
  const toilet = await Toilet.create(req.body);
  res.json(toilet);
});

/**
 * @swagger
 * /toilets:
 *   get:
 *     summary: Retrieve a list of toilets
 *     responses:
 *       200:
 *         description: A list of toilets
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Toilet'
 */
router.get("/toilets", async (req, res) => {
  const toilets = await Toilet.findAll();
  res.json(toilets);
});

/**
 * @swagger
 * /toilets/{id}:
 *   get:
 *     summary: Retrieve a toilet by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A toilet
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Toilet'
 */
router.get("/toilets/:id", async (req, res) => {
  const toilet = await Toilet.findByPk(req.params.id);
  res.json(toilet);
});

/**
 * @swagger
 * /toilets/{id}:
 *   put:
 *     summary: Update a toilet by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Toilet'
 *     responses:
 *       200:
 *         description: The updated toilet
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Toilet'
 */
router.put("/toilets/:id", async (req, res) => {
  const toilet = await Toilet.findByPk(req.params.id);
  if (toilet) {
    await toilet.update(req.body);
    res.json(toilet);
  } else {
    res.status(404).send("Not found");
  }
});

/**
 * @swagger
 * /toilets/{id}:
 *   delete:
 *     summary: Delete a toilet by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Successfully deleted
 */
router.delete("/toilets/:id", async (req, res) => {
  const toilet = await Toilet.findByPk(req.params.id);
  if (toilet) {
    await toilet.destroy();
    res.status(204).send();
  } else {
    res.status(404).send("Not found");
  }
});

module.exports = router;
