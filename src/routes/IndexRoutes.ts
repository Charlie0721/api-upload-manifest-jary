import { Router } from 'express'
import multer  from 'multer';
import { UploadFileToCloudinaryService } from '../services/manifest-services/UploadFileToCloudinaryService';
import { DeleteFileService } from '../services/manifest-services/DeleteFileService';
import { GetFileService } from '../services/manifest-services/GetFileService';
import {SearchFilesByProductsIDService  } from '../services/manifest-services/SearchFilesByProductsIDService';
import { GetFilesService } from '../services/manifest-services/GetFilesService';
import {SearchFileByNameService  } from '../services/manifest-services/SearchFileByNameService';
import {SignupService} from '../services/user-services/SignupService';
import {LoginService} from '../services/user-services/SigninService'
import {GetFilesByManifestId} from '../services/manifest-services/GetFilesByPRoductsId';
import {DonwloadManifestService} from '../services/manifest-services/DownloadFileService';
const storage = multer.memoryStorage();
const upload = multer({ storage });
const router = Router()

router.post('/upload-file',upload.single('fileBase64'),UploadFileToCloudinaryService.uploadFiles )
router.post('/search-products-id/', SearchFilesByProductsIDService.searchByProductsID)
router.get('/get-files', GetFilesService.getFiles)
router.get('/get-file/:_id',GetFileService.getFile )
router.get('/get-file-by-name/',SearchFileByNameService.searchFileByName )
router.get('/get-files-by-manifestposid/:manifestPosId',GetFilesByManifestId.getFiles )
router.delete('/delete-file/:_id',DeleteFileService.deleteFile )
router.post('/signup', SignupService.signUp)
router.post('/signin', LoginService.signin)
router.get('/download-manifest/:public_id',DonwloadManifestService.downloadManifest )


export default router