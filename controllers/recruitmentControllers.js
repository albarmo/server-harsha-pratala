const { Recruitment } = require("../models");

class RecruitmentsControllers {
  static async list(req, res) {
    try {
      const data = await Recruitment.findAll();
      if (data) {
        return res.status(200).json({ data });
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async create(req, res) {
    try {
      const {
        firstName,
        lastName,
        address,
        phone,
        email,
        birthDate,
        faculty,
        year,
        medicalHistory,
        experience,
      } = req.body;

      const newRecruitment = await Recruitment.create(
        {
          firstName,
          lastName,
          address,
          phone,
          email,
          birthDate,
          faculty,
          year,
          medicalHistory,
          experience,
        },
        { returning: true }
      );
      if (!newRecruitment) {
        return res.status(500).json({ message: error });
      } else {
        return res.status(201).json({ newRecruitment });
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async update(req, res) {
    try {
      const recruitmentId = req.params.id;
      const {
        firstName,
        lastName,
        address,
        phone,
        email,
        birthDate,
        faculty,
        year,
        medicalHistory,
        experience,
      } = req.body;

      const updateRecruitment = await Recruitment.update(
        {
          firstName,
          lastName,
          address,
          phone,
          email,
          birthDate,
          faculty,
          year,
          medicalHistory,
          experience,
        },
        {
          where: {
            id: recruitmentId,
          },
          returning: true,
        }
      );
      if (updateRecruitment) {
        return res.status(201).json({ updateRecruitment });
      }
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }

  static async delete(req, res) {
    const recruitmentId = req.params.id;
    try {
      const isExist = await Recruitment.findOne({
        where: { id: recruitmentId },
      });
      if (!isExist) {
        return res.status(404).json({ message: "recruitment data not found!" });
      } else {
        const deleteRecruitments = await Recruitment.destroy({
          where: {
            id: recruitmentId,
          },
          returning: true,
        });
        if (deleteRecruitments) {
          return res
            .status(200)
            .json({ status: `sucess deleted recruitment ${recruitmentId}` });
        }
      }
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }
}

module.exports = RecruitmentsControllers;
