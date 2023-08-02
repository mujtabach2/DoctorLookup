import DoctorsDAO from "../dao/doctorsDAO.js";

export default class DoctorsController {
    static async apiGetDoctors(req, res, next) {
        const doctorsPerPage = req.query.doctorsPerPage ? parseInt(req.query.doctorsPerPage, 10) : 20
        const page = req.query.page ? parseInt(req.query.page, 10) : 0
       
        let filters = {}
        if (req.query.city) {
            filters.city = req.query.city
        }
        if(req.query.specialty){
            filters.specialty = req.query.specialty
        }
// FIX ISSUE DOESNT SEEM TO GET DOCTOR FROM MONGODB BUT CONNECTED
        const { doctorsList, totalNumDoctors } = await DoctorsDAO.getDoctors({
            filters,
            page,
            doctorsPerPage,

        })

        let response = {
            doctors: doctorsList,
            page: page,
            filters: filters,
            entries_per_page: doctorsPerPage,
            total_results: totalNumDoctors,
        }


        res.json(response)
    }

    static async apiGetDoctorById(req, res, next) {
        try {
            let id = req.params.id || {}
            let doctor = await DoctorsDAO.getDoctorByID(id)
            if (!doctor) {
                res.status(404).json({ error: "Not found" })
                return
            }
            res.json(doctor)
        } catch (e) {
            console.log(`api, ${e}`)
            res.status(500).json({ error: e })
        }
    }

    static async apiGetDoctorCities(req, res, next) {
        try {
            let cities = await DoctorsDAO.getCities()
            res.json(cities)
        } catch (e) {
            console.log(`api, ${e}`)
            res.status(500).json({ error: e })
        }
    }
    static async apiGetDoctorTypes(req, res, next) {
        try{
            let types = await DoctorsDAO.getDoctorByType()
            res.json(specialty)
        } catch(e){
            console.log(`api ${e}`)
            res.status(500).json({error: e})
        }
    }

    static async apiGetDoctorName(req,res,next){
        try{
            let name = await DoctorsDAO.getDoctorByName()
            res.json(name)
        }catch(e){
            console.log(`api ${e}`)
            res.status(500).json({error: e})
        }
    }

    static async apiGetDoctorByAddress(req, res, next) {
        try{
            let address = await DoctorsDAO.getDoctorByAddress()
            res.json(address)
        } catch(e){
            console.log(`api ${e}`)
            res.status(500).json({error: e})
        }
    }

}
